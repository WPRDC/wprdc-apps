import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { DatastoreField, GeoJSONFeature } from "@wprdc/types";
import type { LayerSlug } from "@wprdc/ui";
import { asDataDict } from "@wprdc/ui";
import type { Key } from "react-aria-components";
import AdmZip from "adm-zip";
import type postgres from "postgres";
import sql from "@/db";
import type { Dataset } from "@/datasets";
import { datasetsByTable } from "@/datasets";
import { datasetFieldFilter, fieldFilter } from "@/util";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

const BASE_URL = process.env.BASE_URL ?? "";

const readmeTemplate = Handlebars.compile(
  fs.readFileSync(
    path.join(process.cwd(), "src/templates/readme.hbs"),
    "utf-8",
  ),
);

function unionQueries(
  a: postgres.PendingQuery<postgres.Row[]>,
  b: postgres.PendingQuery<postgres.Row[]>,
): postgres.PendingQuery<postgres.Row[]> {
  const unionSql = sql; // alias prevents incorrect webstorm sql syntax error reporting
  return unionSql`${a} UNION ${b}`;
}

/**
 * Builds a subquery that returns parcel IDs from all selection sources:
 * directly selected parcels, administrative regions, drawn areas, and
 * optionally filtered by owner addresses.
 */
function buildParcelSubquery(
  parcelIDs: string[],
  regionParcelQuery: string,
  drawnAreas: GeoJSONFeature[],
  ownerAddresses: string[],
): postgres.PendingQuery<postgres.Row[]> | null {
  const parts: postgres.PendingQuery<postgres.Row[]>[] = [];

  if (parcelIDs.length) {
    parts.push(
      sql`SELECT UNNEST(${sql.array(parcelIDs)}::text[]) AS parcel_id`,
    );
  }

  if (regionParcelQuery) {
    parts.push(sql.unsafe(regionParcelQuery));
  }

  for (const area of drawnAreas) {
    if (!area.geometry) continue;
    parts.push(sql`
      SELECT parcel_id
      FROM spacerat.parcel_index
      WHERE ST_Intersects(geom, ST_GeomFromGeoJSON(${JSON.stringify(area.geometry)}))
    `);
  }

  if (!parts.length) return null;

  const unioned = parts.reduce(unionQueries);

  if (ownerAddresses.length) {
    const addresses = ownerAddresses.map((a) => a.trim());
    return sql`
      SELECT p.parcel_id
      FROM (${unioned}) AS p
      WHERE p.parcel_id IN (
        SELECT parcel_id
        FROM spacerat.parcel_index
        WHERE owner_address = ANY(${sql.array(addresses)}::text[])
      )
    `;
  }

  return unioned;
}

/**
 * Generates a raw SQL subquery string to filter parcels by administrative
 * regions (neighborhoods and municipalities).
 *
 * Returns a raw string for use with sql.unsafe() since it is composed of
 * controlled values (known region IDs) and not user input.
 *
 * @param selection - selection parameters that define what regions to filter by
 */
function buildParcelByRegionSubquery(
  selection: Record<LayerSlug, string[]>,
): string {
  // todo: replace references to parcel_index table with env vars
  let query: string = "";

  if (selection["pittsburgh-neighborhoods"].length) {
    query += `
      SELECT parcel_id
      FROM spacerat.parcel_index
      WHERE ST_Intersects(
              geom,
              (SELECT ST_Union(geom)
               FROM spacerat.neighborhood_index
               WHERE id IN ('${selection["pittsburgh-neighborhoods"].join("', '")}'))
            )
    `;
  }

  if (
    selection["pittsburgh-neighborhoods"].length &&
    selection["allegheny-county-municipalities"].length
  ) {
    query += `UNION`;
  }

  if (selection["allegheny-county-municipalities"].length) {
    const wardStarts: string[] = Array.from(
      selection["allegheny-county-municipalities"].reduce<Set<string>>(
        (results, id) => {
          if (["1", "2", "3", "4"].includes(id.charAt(0)))
            return results.add(id.charAt(0));
          else return results;
        },
        new Set(),
      ),
    );

    let cityPattern: string | undefined = undefined;
    if (wardStarts.length) {
      cityPattern = `^(${wardStarts.join(".*|")}.*)`;
    }

    if (cityPattern) {
      query += `
      SELECT parcel_id
      FROM spacerat.parcel_index
      WHERE municode IN ('${selection["allegheny-county-municipalities"].join("', '")}')
        OR municode ~ '${cityPattern}'`;
    } else {
      query += `
      SELECT parcel_id
      FROM spacerat.parcel_index
      WHERE municode IN ('${selection["allegheny-county-municipalities"].join("', '")}')`;
    }
  }

  return query;
}

/**
 * Gets records from a dataset for the parcels in the selected_parcels temp table.
 */
async function getDatasetParcelData(
  reserved: postgres.ReservedSql,
  dataset: Dataset,
  fieldSelection: "all" | Key[],
  fields: DatastoreField[],
): Promise<Record<string, string | number | boolean>[]> {
  const fieldNames =
    fieldSelection === "all"
      ? fields.filter(datasetFieldFilter(dataset)).map((f) => f.id)
      : (fieldSelection as string[]);

  console.log(dataset.slug, fieldNames);
  return reserved`
    SELECT ${reserved(dataset.parcelIDField)} as parcel_id, ${reserved(fieldNames)}
    FROM ${reserved(dataset.table)}
    JOIN selected_parcels
      ON ${reserved(dataset.parcelIDField)} = selected_parcels.parcel_id;
  `;
}

/**
 * Generates a CSV string from a list of objects.
 *
 * @param headers - list of column headers
 * @param data - list of row objects
 */
function asCSV(
  headers: string[],
  data: Record<string, string | number | boolean | null | undefined>[],
): string {
  if (!data.length) return `${headers.join(",")}\n`;

  return data.reduce<string>(
    (csv, row) => {
      const rowString = headers
        .map((header) => {
          const datum = row[header];
          if (datum === null || datum === undefined) return "";
          return `"${datum}"`;
        })
        .join(",");
      return csv.concat(`${rowString}\n`);
    },
    `${headers.join(",")}\n`,
  );
}

/**
 * Endpoint
 *
 * @param request
 * @constructor
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  // Parse params
  const searchParams = request.nextUrl.searchParams;

  const selectedFeatures = JSON.parse(
    searchParams.get("selectedFeatures") ?? "{}",
  ) as Record<LayerSlug, string[]>;

  const drawnAreas = JSON.parse(
    searchParams.get("drawnAreas") ?? "[]",
  ) as GeoJSONFeature[];

  const ownerAddresses = JSON.parse(
    searchParams.get("ownerAddresses") ?? "[]",
  ) as string[];

  const fieldSelection = JSON.parse(
    searchParams.get("fieldSelection") ?? "{}",
  ) as Record<string, "all" | Key[]>;

  const listSelection = JSON.parse(
    searchParams.get("listSelection") ?? "[]",
  ) as string[];

  // directly selected parcels and list-entered parcels
  const selectedParcels = selectedFeatures.parcels.concat(listSelection);

  // build the combined parcel subquery from all sources
  const regionParcelQuery = buildParcelByRegionSubquery(selectedFeatures);
  const parcelSubquery = buildParcelSubquery(
    selectedParcels,
    regionParcelQuery,
    drawnAreas,
    ownerAddresses,
  );

  // fieldSelection is keyed by table names
  const dataTables = Object.keys(fieldSelection);

  const tableFields: DatastoreField[][] = await Promise.all(
    dataTables.map((table) =>
      fetch(`${BASE_URL}/api/fields/${table}`).then((res) =>
        (res.json() as Promise<{ fields: DatastoreField[] }>).then(
          ({ fields }) => fields,
        ),
      ),
    ),
  );

  const fieldDefs: Record<string, DatastoreField[]> = Object.fromEntries(
    dataTables.map((table, i) => [table, tableFields[i]]),
  );

  const reserved = await sql.reserve();

  let data: Record<string, string | number | boolean>[][] = [];
  let allParcelIDs: { parcel_id: string }[] = [];

  try {
    // drop temp table if it exists from a previous request on this connection
    await reserved`DROP TABLE IF EXISTS selected_parcels`;

    // create a temp table of selected parcel IDs with a default of all parcels if no subquery provided
    await reserved`
      CREATE TEMP TABLE selected_parcels AS
      SELECT DISTINCT parcel_id
      FROM (${parcelSubquery ?? reserved`SELECT parcel_id FROM spacerat.parcel_index`}) AS p
   `;

    await reserved`CREATE INDEX ON selected_parcels(parcel_id)`;
    await reserved`ANALYZE selected_parcels`;

    data = await Promise.all(
      dataTables.map((table) => {
        const currentDataset = datasetsByTable[table];
        const filteredFields = fieldDefs[table].filter(
          fieldFilter([
            ...(currentDataset.ignoredFields ?? []),
            currentDataset.parcelIDField,
          ]),
        );
        return getDatasetParcelData(
          reserved,
          currentDataset,
          fieldSelection[table],
          filteredFields,
        );
      }),
    );

    allParcelIDs = await reserved<{ parcel_id: string }[]>`
      SELECT parcel_id FROM selected_parcels
    `;
  } finally {
    reserved.release();
  }

  const results: Record<string, Record<string, string | number | boolean>[]> =
    Object.fromEntries(dataTables.map((table, i) => [table, data[i]]));

  // build zip file
  const zip = new AdmZip();
  let dataDictionary = "";
  const dataFiles: string[] = [];
  const sources: string[] = [];

  Object.entries(results).forEach(([table, tableData], i) => {
    const dataset = datasetsByTable[table];
    const tableSelection = fieldSelection[table];
    const fields =
      tableSelection === "all"
        ? fieldDefs[table].filter(datasetFieldFilter(dataset))
        : fieldDefs[table].filter((fieldDef) =>
            tableSelection.includes(fieldDef.id),
          );

    const headers = ["parcel_id", ...fields.map((f) => f.id)];
    zip.addFile(
      `data/${dataset.slug}.csv`,
      Buffer.from(asCSV(headers, tableData)),
    );

    dataDictionary += asDataDict(fields, {
      noHeader: Boolean(i),
      table: dataset.slug,
    });

    dataFiles.push(`data/${dataset.slug}.csv`);
    sources.push(dataset.datasetURL);
  });

  dataDictionary += `all,parcel_id,Parcel ID,text,16-digit Allegheny County parcel identification number.\n`;
  zip.addFile("data-dictionary.csv", Buffer.from(dataDictionary));

  zip.addFile(
    "parcels.txt",
    Buffer.from(allParcelIDs.map((r) => r.parcel_id).join("\n")),
  );

  if (ownerAddresses.length) {
    zip.addFile(
      "owner-addresses.txt",
      Buffer.from(ownerAddresses.join("\n"), "utf8"),
    );
  }

  zip.addFile(
    "selection/map-selection.json",
    Buffer.from(JSON.stringify({ selectedFeatures, drawnAreas }, null, 2)),
  );
  zip.addFile(
    "selection/field-selection.json",
    Buffer.from(JSON.stringify(fieldSelection, null, 2)),
  );

  const readmeText = readmeTemplate({
    generatedOn: new Date().toLocaleString(),
    hasOwnerAddresses: ownerAddresses.length > 0,
    ownerAddresses,
    dataFiles,
    sources,
  });
  zip.addFile("README.txt", Buffer.from(readmeText));

  return new NextResponse(new Uint8Array(zip.toBuffer()), {
    headers: { "Content-Type": "application/x-zip" },
  });
}
