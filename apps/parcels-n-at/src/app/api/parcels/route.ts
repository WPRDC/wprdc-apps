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

/**
 * Queries the DB to get a list of IDs for parcels that fall within the
 *  boundaries of the selected layer features.
 */
async function getParcelsInRegion(
  layerSlug: AdminRegionLayerSlug,
  selectedIDs: string[],
): Promise<string[]> {
  const layerConfig = dataLayers[layerSlug];
  const { idField, source } = layerConfig;
  const { resourceID } = source;

  // query all parcels that fall under the select regions
  // todo: replace references to parcel_index table with env vars

  const records = await sql<ParcelSearchRecord[]>`
      SELECT parcel_id 
      FROM parcel_index 
      WHERE ST_Intersects(
        geom, 
        (
          SELECT ST_Union(_geom)
          FROM ${sql(resourceID)} 
          WHERE ${sql(idField)} IN ${sql(selectedIDs)}
        )
      )
    `;

  return records.map((r) => r.parcel_id);
}

async function getParcelsUnderFeature(
  feature: GeoJSONFeature,
): Promise<string[]> {
  // todo: replace references to parcel_index table with env vars
  const records = await sql<ParcelSearchRecord[]>`
      SELECT parcel_id 
      FROM parcel_index 
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
  fieldSelection: "all" | Key[],
  fields: DatastoreField[],
): Promise<Record<string, string | number | boolean>[]> {
  const selectedAll = fieldSelection === "all";
  const fieldNames: string[] = selectedAll
    ? fields.filter(datasetFieldFilter(dataset)).map((field) => field.id)
    : (fieldSelection as string[]);

  return sql`
          SELECT ${sql(dataset.parcelIDField)} as parcel_id, ${sql(fieldNames)}
          FROM ${sql(dataset.table)}
          WHERE ${sql(dataset.parcelIDField)} IN ${sql(parcelIDs)};
        `;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Parse params
  const searchParams = request.nextUrl.searchParams;

  const selectedFeatures = JSON.parse(
    searchParams.get("selectedFeatures") ?? "{}",
  ) as Record<LayerSlug, string[]>;

  const drawnAreas = JSON.parse(
    searchParams.get("drawnAreas") ?? "[]",
  ) as GeoJSONFeature[];

  const fieldSelection = JSON.parse(
    searchParams.get("fieldSelection") ?? "{}",
  ) as Record<string, "all" | Key[]>;

  // Get set of selected parcels
  // directly-selected parcels
  const selectedParcels = selectedFeatures.parcels;

  // get parcels under the selected admin regions
  const regionParcelLists: string[][] = await Promise.all(
    REGION_SLUGS.map((slug) => {
      const selection = selectedFeatures[slug];
      if (selection.length) return getParcelsInRegion(slug, selection);
      return Promise.resolve([]);
    }),
  );

  // get parcels under the draw areas
  const drawingParcelLists: string[][] = await Promise.all(
    drawnAreas.map((drawnArea) => getParcelsUnderFeature(drawnArea)),
  );

  // set of all selected parcels with no duplicates
  const allParcels = Array.from(
    new Set<string>(
      selectedParcels
        .concat(regionParcelLists.flat())
        .concat(drawingParcelLists.flat()),
    ),
  );

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
  data-dictionary.csv - definitions of fields found in data files
  parcels.txt         - list of selected parcel IDs
  selection.json      - serialized form of selection used to generate this 
                          output, can be uploaded/copied to form to reuse.
  
Data Files
`;

  const sources: string[] = [];
  Object.entries(results).forEach(([table, tableData], i) => {
    if (tableData.length) {
      const dataset = datasetsByTable[table];
      // add file to zip
      zip.addFile(`${dataset.slug}.csv`, Buffer.from(asCSV(tableData)));

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
      readmeText += `  ${dataset.slug}.csv\n`;
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
    "selection.json",
    Buffer.from(
      JSON.stringify(
        {
          selectedFeatures,
          drawnAreas,
          fieldSelection,
        },
        null,
        2,
      ),
    ),
  );

  // add manifest to zip file
  readmeText += `\nSources\n  ${sources.join("\n  ")}`;
  zip.addFile("README.txt", Buffer.from(readmeText));

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
