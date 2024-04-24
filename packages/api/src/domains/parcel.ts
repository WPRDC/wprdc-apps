import {
  ArchiveAssessmentAppeal,
  CityViolation,
  ConservatorshipRecord,
  Coordinate,
  DatastoreRecord,
  FiledAssessmentAppeal,
  ForeclosureFiling,
  ParcelBoundary,
  PLIPermit,
  PropertyAssessment,
  PropertySaleTransaction,
  QueryResult,
  TaxLienWithCurrentStatus,
} from "@wprdc/types";
import {
  fetchDatastoreSearch,
  fetchSQLSearch,
  toFieldLookup,
} from "../fetch-util";
import { APIResult } from "../types";
import { RankedParcelIndex } from "@wprdc/types/src";

export enum ParcelTable {
  Assessment = "property_assessments",
  PropertySaleTransactions = "property_sale_transactions",
  AssessmentAppeals = "8e92a566-b52b-4d10-9fb5-c18b883cd926",
  FiledAssessmentAppeals = "12e00874-bdca-46c2-89ab-bd0e9272b3cb",
  PLIPermit = "pli_permits",
  CityViolations = "city_violations",
  ForeclosureFilings = "foreclosure_filings",
  TaxLiensWithCurrentStatus = "tax_liens_with_current_status",
  ConservatorshipRecord = "conservatorship_record",
  ParcelBoundaries = "parcel_boundaries",
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
};

function _fetchParcelRecords<T extends DatastoreRecord>(
  parcelID: string,
  table: ParcelTable,
  queryParams?: Record<string, string | number>,
): Promise<Partial<QueryResult<T>>> {
  const parcelIDField = parcelIDFields[table];
  return fetchDatastoreSearch<T>(
    table,
    JSON.stringify({ [parcelIDField]: parcelID }),
    queryParams,
  );
}

export async function fetchParcelRecords<T extends DatastoreRecord>(
  parcelID: string,
  table: ParcelTable,
  queryParams?: Record<string, string | number>,
): Promise<APIResult<T>> {
  const { fields, records } = await _fetchParcelRecords<T>(
    parcelID,
    table,
    queryParams,
  );
  if (!records || !fields) {
    console.warn(`Nothing found for ${parcelID} on table ${table}.`);
    return { fields: undefined, records: undefined };
  }
  return { fields: toFieldLookup(fields), records: records };
}

// Individual resource fetchers
export const fetchAssessmentRecord = (parcelID: string) =>
  fetchParcelRecords<PropertyAssessment>(parcelID, ParcelTable.Assessment);
export const fetchParcelBoundariesRecord = (parcelID: string) =>
  fetchParcelRecords<ParcelBoundary>(parcelID, ParcelTable.ParcelBoundaries);
export const fetchFiledAssessmentAppealsRecord = (parcelID: string) =>
  fetchParcelRecords<FiledAssessmentAppeal>(
    parcelID,
    ParcelTable.FiledAssessmentAppeals,
  );
export const fetchPropertySaleTransactionsRecords = (parcelID: string) =>
  fetchParcelRecords<PropertySaleTransaction>(
    parcelID,
    ParcelTable.PropertySaleTransactions,
  );
export const fetchAssessmentAppealsRecords = (parcelID: string) =>
  fetchParcelRecords<ArchiveAssessmentAppeal>(
    parcelID,
    ParcelTable.AssessmentAppeals,
  );
export const fetchPLIPermitRecords = (parcelID: string) =>
  fetchParcelRecords<PLIPermit>(parcelID, ParcelTable.PLIPermit);
export const fetchCityViolationsRecords = (parcelID: string) =>
  fetchParcelRecords<CityViolation>(parcelID, ParcelTable.CityViolations);
export const fetchForeclosureFilingsRecords = (parcelID: string) =>
  fetchParcelRecords<ForeclosureFiling>(
    parcelID,
    ParcelTable.ForeclosureFilings,
  );
export const fetchTaxLiensWithCurrentStatusRecords = (parcelID: string) =>
  fetchParcelRecords<TaxLienWithCurrentStatus>(
    parcelID,
    ParcelTable.TaxLiensWithCurrentStatus,
  );
export const fetchConservatorshipRecordRecords = (parcelID: string) =>
  fetchParcelRecords<ConservatorshipRecord>(
    parcelID,
    ParcelTable.ConservatorshipRecord,
  );

export async function fetchOwnerName(parcelID: string): Promise<string> {
  try {
    const requestURL = `https://tools.wprdc.org/property-whois/whois/${parcelID}/`;

    const response = await fetch(requestURL);
    const { name, success } = (await response.json()) as {
      name: string;
      success: boolean;
    };
    if (name) return name;
    else {
      throw new Error(`Owner not found for ${parcelID}`);
    }
  } catch (error) {
    console.error(`Owner not found for ${parcelID}`);
    throw new Error(`Owner not found for ${parcelID}`);
  }
}

export async function autocompleteParcelSearch(
  searchTerm: string,
  limit: number = 10,
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
             parcel_index._full_text <-> '${searchTerm}' AS dist
      FROM parcel_index
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
  centroid: Coordinate;
  bbox: [Coordinate, Coordinate];
}

export async function geocodeParcel(
  parcelID: string,
  init?: RequestInit,
): Promise<GeocodeResponse | null> {
  const sql: string = `
  SELECT 
    "PIN", 
    ST_AsGeoJSON(ST_Centroid(_geom)) as centroid, 
    ST_AsGeoJSON(ST_Envelope(_geom)) as bbox
  FROM "parcel_boundaries"
  WHERE "PIN" = '${parcelID}'
  LIMIT 1
  `;

  const { records } = await fetchSQLSearch<{
    PIN: string;
    centroid: string;
    bbox: string;
  }>(sql, undefined, init);

  if (!records || !records.length) return null;
  const bboxPolygon: Coordinate[][] = JSON.parse(records[0].bbox).coordinates;
  const centroid: Coordinate = JSON.parse(records[0].centroid).coordinates;

  return {
    centroid: centroid,
    bbox: [bboxPolygon[0][0], bboxPolygon[0][2]],
  };
}
