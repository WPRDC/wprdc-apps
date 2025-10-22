import type {
  ArchiveAssessmentAppeal,
  CityViolation,
  ConservatorshipRecord,
  CoordinatePair,
  DatastoreRecord,
  EBLL,
  FiledAssessmentAppeal,
  ForeclosureFiling,
  ParcelBoundary,
  PLIPermit,
  PropertyAssessment,
  PropertySaleTransaction,
  QueryResult,
  RankedParcelIndex,
  TaxLienWithCurrentStatus,
} from "@wprdc/types";

import { fetchFields, fetchSQLSearch, toFieldLookup } from "../fetch-util";
import type { APIResult } from "../types";
import { CondemnedStatus, LeadLine, WaterProvider } from "@wprdc/types/src";

export enum ParcelTable {
  Assessment = "65855e14-549e-4992-b5be-d629afc676fa",
  PropertySaleTransactions = "5bbe6c55-bce6-4edb-9d04-68edeb6bf7b1",
  AssessmentAppeals = "8a7607fb-c93e-4d7a-9b23-528b5c25b1de",
  FiledAssessmentAppeals = "90432617-9b09-4084-919b-02aa002b6512",
  PLIPermit = "f4d1177a-f597-4c32-8cbf-7885f56253f6",
  CityViolations = "70c06278-92c5-4040-ab28-17671866f81c",
  ForeclosureFilings = "foreclosure_filings",
  TaxLiensWithCurrentStatus = "tax_liens_with_current_status",
  ConservatorshipRecord = "fd64c179-b5af-4263-9275-fb581705d878",
  ParcelBoundaries = "858bbc0f-b949-4e22-b4bb-1a78fef24afc",
  CondemnedStatus = "0a963f26-eb4b-4325-bbbc-3ddf6a871410",
  LeadLine = "2ddfd798-b71a-4f78-bc17-8c54c6a30511",
  WaterProvider = "e85ee57f-5231-41c3-b955-62404157bd14",
  EBLL = "39e8ae7e-5dca-421e-b87d-8cec34c91950",
}

export const parcelIDFields: Record<ParcelTable, string> = {
  [ParcelTable.Assessment]: "PARID",
  [ParcelTable.ParcelBoundaries]: "PIN",
  [ParcelTable.FiledAssessmentAppeals]: "parcel_id",
  [ParcelTable.PropertySaleTransactions]: "PARID",
  [ParcelTable.AssessmentAppeals]: "PARCEL ID",
  [ParcelTable.PLIPermit]: "parcel_num",
  [ParcelTable.CityViolations]: "parcel_id",
  [ParcelTable.ForeclosureFilings]: "pin",
  [ParcelTable.TaxLiensWithCurrentStatus]: "pin",
  [ParcelTable.ConservatorshipRecord]: "pin",
  [ParcelTable.CondemnedStatus]: "parcel_id",
  [ParcelTable.LeadLine]: "parcel_id",
  [ParcelTable.WaterProvider]: "PIN",
  [ParcelTable.EBLL]: "parcel_id",
};

async function _fetchParcelRecords<T extends DatastoreRecord>(
  parcelID: string | string[],
  table: ParcelTable,
  queryParams?: Record<string, string | number>,
): Promise<Partial<QueryResult<T>>> {
  const parcelIDField = parcelIDFields[table];
  const parcelIDs = Array.isArray(parcelID) ? parcelID : [parcelID];

  const { records } = await fetchSQLSearch<T>(
    `SELECT *
     FROM "${table}"
     WHERE "${parcelIDField}" IN (${parcelIDs.map((pid) => `'${pid}'`).join(", ")})`,
    queryParams,
  );

  const fields = await fetchFields(table);
  return { fields, records };
}

export async function fetchParcelRecords<T extends DatastoreRecord>(
  parcelID: string | string[],
  table: ParcelTable,
  queryParams?: Record<string, string | number>,
): Promise<APIResult<T>> {
  const { records, fields } = await _fetchParcelRecords<T>(
    parcelID,
    table,
    queryParams,
  );
  if (!records || !fields) {
    // eslint-disable-next-line no-console -- rare and useful
    console.warn(`Nothing found for ${String(parcelID)} on table ${table}.`);
    return { fields: undefined, records: undefined };
  }

  return { fields: toFieldLookup(fields), records };
}

// Individual resource fetchers
export const fetchLeadLineRecord = (
  parcelID: string | string[],
): Promise<APIResult<LeadLine>> =>
  fetchParcelRecords<LeadLine>(parcelID, ParcelTable.LeadLine);

export const fetchEBLL = (
  parcelID: string | string[],
): Promise<APIResult<EBLL>> =>
  fetchParcelRecords<EBLL>(parcelID, ParcelTable.EBLL);

export const fetchWaterProvider = (
  parcelID: string | string[],
): Promise<APIResult<WaterProvider>> =>
  fetchParcelRecords<WaterProvider>(parcelID, ParcelTable.WaterProvider);

// Individual resource fetchers
export const fetchAssessmentRecord = (
  parcelID: string | string[],
): Promise<APIResult<PropertyAssessment>> =>
  fetchParcelRecords<PropertyAssessment>(parcelID, ParcelTable.Assessment);

export const fetchParcelBoundariesRecord = (
  parcelID: string | string[],
): Promise<APIResult<ParcelBoundary>> =>
  fetchParcelRecords<ParcelBoundary>(parcelID, ParcelTable.ParcelBoundaries);

export const fetchFiledAssessmentAppealsRecord = (
  parcelID: string | string[],
): Promise<APIResult<FiledAssessmentAppeal>> =>
  fetchParcelRecords<FiledAssessmentAppeal>(
    parcelID,
    ParcelTable.FiledAssessmentAppeals,
  );

export const fetchPropertySaleTransactionsRecords = (
  parcelID: string | string[],
): Promise<APIResult<PropertySaleTransaction>> =>
  fetchParcelRecords<PropertySaleTransaction>(
    parcelID,
    ParcelTable.PropertySaleTransactions,
  );

export const fetchAssessmentAppealsRecords = (
  parcelID: string | string[],
): Promise<APIResult<ArchiveAssessmentAppeal>> =>
  fetchParcelRecords<ArchiveAssessmentAppeal>(
    parcelID,
    ParcelTable.AssessmentAppeals,
  );

export const fetchPLIPermitRecords = (
  parcelID: string | string[],
): Promise<APIResult<PLIPermit>> =>
  fetchParcelRecords<PLIPermit>(parcelID, ParcelTable.PLIPermit);

export const fetchCityViolationsRecords = (
  parcelID: string | string[],
): Promise<APIResult<CityViolation>> =>
  fetchParcelRecords<CityViolation>(parcelID, ParcelTable.CityViolations);

export const fetchForeclosureFilingsRecords = (
  parcelID: string | string[],
): Promise<APIResult<ForeclosureFiling>> =>
  fetchParcelRecords<ForeclosureFiling>(
    parcelID,
    ParcelTable.ForeclosureFilings,
  );

export const fetchTaxLiensWithCurrentStatusRecords = (
  parcelID: string | string[],
): Promise<APIResult<TaxLienWithCurrentStatus>> =>
  fetchParcelRecords<TaxLienWithCurrentStatus>(
    parcelID,
    ParcelTable.TaxLiensWithCurrentStatus,
  );

export const fetchConservatorshipRecordRecords = (
  parcelID: string | string[],
): Promise<APIResult<ConservatorshipRecord>> =>
  fetchParcelRecords<ConservatorshipRecord>(
    parcelID,
    ParcelTable.ConservatorshipRecord,
  );

export const fetchCondemnedStatusRecords = (
  parcelID: string | string[],
): Promise<APIResult<CondemnedStatus>> =>
  fetchParcelRecords<CondemnedStatus>(parcelID, ParcelTable.CondemnedStatus);

export async function autocompleteParcelSearch(
  searchTerm: string,
  limit = 10,
  init?: RequestInit,
): Promise<RankedParcelIndex[]> {
  const sql: string = `
      SELECT parcel_id,
             class,
             housenum,
             fraction,
             unit,
             street,
             city,
             state,
             zip,
             address,
             geom,
             centroid,
            spacerat.parcel_index._full_text <-> '${searchTerm}' AS dist
      FROM spacerat.parcel_index
      ORDER BY dist
      LIMIT ${limit}
      `.replace(/\s+/g, " ");

  const { records } = await fetchSQLSearch<RankedParcelIndex>(
    sql,
    undefined,
    init,
  );

  return records ?? [];
}

export interface GeocodeResponse {
  centroid?: CoordinatePair;
  bbox?: [CoordinatePair, CoordinatePair];
}

export async function geocodeParcel(
  parcelID: string,
  init?: RequestInit,
): Promise<GeocodeResponse> {
  const sql = `
      SELECT "parcel_id",
             ST_AsGeoJSON(centroid) as centroid,
             ST_AsGeoJSON(ST_Envelope(geom)) as bbox
      FROM spacerat."parcel_index"
      WHERE "parcel_id" = '${parcelID}'
      LIMIT 1
  `;

  const { records } = await fetchSQLSearch<{
    PIN: string;
    centroid: string;
    bbox: string;
  }>(sql, undefined, init);

  if (!records?.length) return { centroid: undefined, bbox: undefined };
  const record = records[0];

  const bboxPolygon: CoordinatePair[][] = (
    JSON.parse(record.bbox) as {
      coordinates: CoordinatePair[][];
    }
  ).coordinates;

  const centroid: CoordinatePair = (
    JSON.parse(record.centroid) as {
      coordinates: CoordinatePair;
    }
  ).coordinates;

  return {
    centroid,
    bbox: [bboxPolygon[0][0], bboxPolygon[0][2]],
  };
}
