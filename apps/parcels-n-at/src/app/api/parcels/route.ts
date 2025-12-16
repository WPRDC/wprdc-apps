import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { DatastoreField, GeoJSONFeature } from "@wprdc/types";
import type { LayerSlug } from "@wprdc/ui";
import { asDataDict, dataLayers } from "@wprdc/ui";
import type { Key } from "react-aria-components";
import AdmZip from "adm-zip";
import sql from "@/db";
import type { Dataset } from "@/datasets";
import { datasetsByTable } from "@/datasets";
import { datasetFieldFilter, fieldFilter } from "@/util";

interface ParcelSearchRecord {
  parcel_id: string;
}

type AdminRegionLayerSlug =
  | "pittsburgh-neighborhoods"
  | "allegheny-county-municipalities";

const REGION_SLUGS: AdminRegionLayerSlug[] = [
  "pittsburgh-neighborhoods",
  "allegheny-county-municipalities",
];

const BASE_URL = process.env.BASE_URL ?? "";

async function getParcelsByOwners(ownerAddresses: string[]) {
  if (!ownerAddresses.length) return [];

  const addresses = ownerAddresses.map((a) => a.trim());

  const records = await sql<ParcelSearchRecord[]>`
      SELECT parcel_id
      FROM spacerat.parcel_index
      WHERE "owner_address" IN ${sql(addresses)}
    `;

  return records.map((r) => r.parcel_id);
}

/**
 * Queries the DB to get a list of IDs for parcels that fall within the
 *  boundaries of the selected layer features.
 */
async function getParcelsInRegion(
  layerSlug: AdminRegionLayerSlug,
  selectedIDs: string[],
): Promise<string[]> {
  const layerConfig = dataLayers[layerSlug];
  const { interaction } = layerConfig;
  const { idField } = interaction ?? {};
  // query all parcels that fall under the select regions
  // todo: replace references to parcel_index table with env vars

  if (layerSlug === "pittsburgh-neighborhoods") {
    const records = await sql<ParcelSearchRecord[]>`
      SELECT parcel_id
      FROM spacerat.parcel_index
      WHERE ST_Intersects(
              geom,
              (SELECT ST_Union(geom)
               FROM spacerat.neighborhood_index
               WHERE ${sql(idField ?? "")} IN ${sql(selectedIDs)})
            )
    `;

    return records.map((r) => r.parcel_id);
  }

  // note: the cities have municodes for each ward so we need special conditions for those munies
  if (layerSlug === "allegheny-county-municipalities") {
    // get set of city municode first chars
    const wardStarts: string[] = Array.from(
      selectedIDs.reduce<Set<string>>((results, id) => {
        if (["1", "2", "3", "4"].includes(id.charAt(0)))
          return results.add(id.charAt(0));
        else return results;
      }, new Set()),
    );

    let cityPattern: string | undefined = undefined;
    if (wardStarts.length) {
      cityPattern = `(${wardStarts.join("*|")}*)`;
    }

    if (cityPattern) {
      console.log(cityPattern);

      const records = await sql<ParcelSearchRecord[]>`
      SELECT parcel_id
      FROM spacerat.parcel_index
      WHERE municode IN ${sql(selectedIDs)} 
        OR municode ~ ${cityPattern}`;
      console.log(records);
      return records.map((r) => r.parcel_id);
    } else {
      const records = await sql<ParcelSearchRecord[]>`
      SELECT parcel_id
      FROM spacerat.parcel_index
      WHERE municode IN ${sql(selectedIDs)}`;

      return records.map((r) => r.parcel_id);
    }
  }

  return [];
}

function getParcelQuery(selection: Record<LayerSlug, string[]>): string {
  // query all parcels that fall under the select regions
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
    query += `
    UNION
    `;
  }
  if (selection["allegheny-county-municipalities"].length) {
    // get set of city municode first chars
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

  console.log(query);

  return query;
}

async function getParcelsUnderFeature(
  feature: GeoJSONFeature,
): Promise<string[]> {
  // todo: replace references to parcel_index table with env vars
  const records = await sql<ParcelSearchRecord[]>`
      SELECT parcel_id 
      FROM spacerat.parcel_index 
      WHERE ST_Intersects(
        geom, 
        ST_GeomFromGeoJSON(${JSON.stringify(feature.geometry)})
      )
    `;

  return records.map((r) => r.parcel_id);
}

/**
 * Gets records from dataset for the provided parcels.
 */
async function getDatasetParcelData(
  dataset: Dataset,
  parcelIDs: string[],
  ownerParcelIDs: string[],
  regionParcelQuery: string,
  fieldSelection: "all" | Key[],
  fields: DatastoreField[],
): Promise<Record<string, string | number | boolean>[]> {
  const selectedAll = fieldSelection === "all";
  const fieldNames: string[] = selectedAll
    ? fields.filter(datasetFieldFilter(dataset)).map((field) => field.id)
    : (fieldSelection as string[]);

  console.log("🎅🏻", parcelIDs);

  if (ownerParcelIDs.length) {
    if (parcelIDs.length) {
      return sql`
          SELECT ${sql(dataset.parcelIDField)} as parcel_id, ${sql(fieldNames)}
          FROM ${sql(dataset.table)}
          WHERE (${sql(dataset.parcelIDField)} IN ${sql(parcelIDs)}
            OR ${sql(dataset.parcelIDField)} IN (${sql.unsafe(regionParcelQuery)}))
            AND ${sql(dataset.parcelIDField)} IN ${sql(ownerParcelIDs)};
        `;
    } else {
      return sql`
          SELECT ${sql(dataset.parcelIDField)} as parcel_id, ${sql(fieldNames)}
          FROM ${sql(dataset.table)}
          WHERE ${sql(dataset.parcelIDField)} IN (${sql.unsafe(regionParcelQuery)})
            AND ${sql(dataset.parcelIDField)} IN ${sql(ownerParcelIDs)};
        `;
    }
  } else {
    if (parcelIDs.length) {
      return sql`
          SELECT ${sql(dataset.parcelIDField)} as parcel_id, ${sql(fieldNames)}
          FROM ${sql(dataset.table)}
          WHERE ${sql(dataset.parcelIDField)} IN ${sql(parcelIDs)}
            OR ${sql(dataset.parcelIDField)} IN (${sql.unsafe(regionParcelQuery)});
        `;
    } else {
      return sql`
          SELECT ${sql(dataset.parcelIDField)} as parcel_id, ${sql(fieldNames)}
          FROM ${sql(dataset.table)}
          WHERE ${sql(dataset.parcelIDField)} IN (${sql.unsafe(regionParcelQuery)});
        `;
    }
  }
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

  // Get parcel query

  // Get set of selected parcels
  // directly-selected parcels and list-entered parcels
  const selectedParcels = selectedFeatures.parcels.concat(listSelection);

  // get parcels under the selected admin regions
  const regionParcelQuery: string = getParcelQuery(selectedFeatures);

  // get parcels under the draw areas
  const drawingParcelLists: string[][] = await Promise.all(
    drawnAreas.map((drawnArea) => getParcelsUnderFeature(drawnArea)),
  );

  // set of all selected parcels with no duplicates
  let allParcels = Array.from(
    new Set<string>(selectedParcels.concat(drawingParcelLists.flat())),
  );

  let ownerParcelIDs: string[] = [];
  // if also searching by owner
  if (ownerAddresses.length) {
    ownerParcelIDs = await getParcelsByOwners(ownerAddresses);
  }

  // fieldSelection is keyed by table names
  const dataTables = Object.keys(fieldSelection);

  const tableFields: DatastoreField[][] = await Promise.all(
    dataTables.map((table) =>
      fetch(`${BASE_URL}/api/fields/${table}`).then((res) =>
        (
          res.json() as Promise<{
            fields: DatastoreField[];
          }>
        ).then(({ fields }) => fields),
      ),
    ),
  );

  const fieldDefs: Record<string, DatastoreField[]> = Object.fromEntries(
    dataTables.map((table, i) => [table, tableFields[i]]),
  );

  const data = await Promise.all(
    dataTables.map((table) => {
      const currentDataset: Dataset = datasetsByTable[table];
      const filteredFields = fieldDefs[table].filter(
        fieldFilter([
          ...(currentDataset.ignoredFields ?? []),
          currentDataset.parcelIDField,
        ]),
      );
      return getDatasetParcelData(
        currentDataset,
        allParcels,
        ownerParcelIDs,
        regionParcelQuery,
        fieldSelection[table],
        filteredFields,
      );
    }),
  );

  // map table names to each table's data
  const results: Record<string, Record<string, string | number | boolean>[]> =
    Object.fromEntries(dataTables.map((table, i) => [table, data[i]]));

  // start zip file with CSVs of data tables
  const zip = new AdmZip();
  let dataDictionary = "";
  let readmeText = `README
  
This archive contains a customized parcel data extraction from:

  https://www.wprdc.org/parcels-n-at

--------------------------------------------------------------------------------

Generated on: ${new Date().toLocaleString()}

Metadata Files
  data-dictionary.csv   - definitions of fields found in data files

  parcels.txt           - list of parcels found within all selection parameters

  selection/parcel-selection.json - serialized form of parcel selection used to
                                    generate this output, can be uploaded/copied 
                                    to form to reuse.

  selection/field-selection.json  - serialized form of field selection used to
                                    generate this output, can be uploaded/copied
                                    to form to reuse.


Data Files
`;

  const sources: string[] = [];
  Object.entries(results).forEach(([table, tableData], i) => {
    if (tableData.length) {
      const dataset = datasetsByTable[table];
      // add file to zip
      zip.addFile(`data/${dataset.slug}.csv`, Buffer.from(asCSV(tableData)));

      // add fields to dict
      const tableSelection = fieldSelection[table];
      const fields =
        tableSelection === "all"
          ? fieldDefs[table].filter(datasetFieldFilter(dataset))
          : fieldDefs[table].filter((fieldDef) =>
              tableSelection.includes(fieldDef.id),
            );

      dataDictionary += asDataDict(fields, {
        noHeader: Boolean(i),
        table: dataset.slug,
      });

      // add file to manifest
      readmeText += `  data/${dataset.slug}.csv\n`;
      sources.push(dataset.datasetURL);
    }
  });

  // add data dictionary to zip file with final row for parcel ID
  dataDictionary += `all,parcel_id,Parcel ID,text,16-digit Allegheny County parcel identification number.\n`;
  zip.addFile("data-dictionary.csv", Buffer.from(dataDictionary));

  // add list of parcels to zip file
  zip.addFile("parcels.txt", Buffer.from(allParcels.join("\n")));

  // add selection to zip file
  zip.addFile(
    "selection/map-selection.json",
    Buffer.from(
      JSON.stringify(
        {
          selectedFeatures,
          drawnAreas,
        },
        null,
        2,
      ),
    ),
  );
  zip.addFile(
    "selection/field-selection.json",
    Buffer.from(JSON.stringify(fieldSelection, null, 2)),
  );

  // add manifest to zip file
  readmeText += `\nSources\n  ${sources.join("\n  ")}`;
  zip.addFile("README.txt", Buffer.from(readmeText));

  if (ownerAddresses.length) {
    readmeText += `\nOwner Addresses\n  ${ownerAddresses.join("\n  ")}`;
  }

  return new NextResponse(zip.toBuffer(), {
    headers: { "Content-Type": "application/x-zip" },
  });
}

function asCSV(
  data: Record<string, string | number | boolean | null | undefined>[],
): string {
  const headers: string[] = Object.keys(data[0]);

  return data.reduce<string>(
    (csv, row) => {
      // wrap in quotes and comma-separate
      const rowString = headers.map((h) => renderCell(row[h])).join(",");
      return csv.concat(`${rowString}\n`);
    },
    `${headers.join(",")}\n`,
  );
}

function renderCell(
  datum: string | number | boolean | null | undefined,
): string {
  if (datum === null || datum === undefined) return "";
  return `"${datum}"`;
}
