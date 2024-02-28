import {
  DatastoreRecord,
  ParcelBoundary,
  PropertyAssessment,
  QueryResult,
} from "@wprdc/types";
import { fetchDatastoreSearch, toFieldLookup } from "../fetch-util";
import { APIMultiResult, APISingleResult } from "../types";

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

export function fetchParcelRecords<T extends DatastoreRecord>(
  parcelID: string,
  table: ParcelTable,
  queryParams?: Record<string, string>,
): Promise<Partial<QueryResult<T>>> {
  const parcelIDField = parcelIDFields[table];
  return fetchDatastoreSearch<T>(
    table,
    JSON.stringify({ [parcelIDField]: parcelID }),
    queryParams,
  );
}

export async function fetchSingleParcelRecord<T extends DatastoreRecord>(
  parcelID: string,
  table: ParcelTable,
  queryParams?: Record<string, string>,
): Promise<APISingleResult<T> | undefined> {
  const { fields, records } = await fetchParcelRecords<T>(
    parcelID,
    table,
    queryParams,
  );
  if (!records || !fields) {
    console.warn(`Nothing found for ${parcelID} on table ${table}.`);
    return undefined;
  }
  if (records.length > 1)
    console.warn(
      `More than one record found for ${parcelID} on table ${table}.`,
    );
  return { fields: toFieldLookup(fields), record: records[0] };
}

export async function fetchMultipleParcelRecords<T extends DatastoreRecord>(
  parcelID: string,
  table: ParcelTable,
  queryParams?: Record<string, string>,
): Promise<APIMultiResult<T> | undefined> {
  const { fields, records } = await fetchParcelRecords<T>(
    parcelID,
    table,
    queryParams,
  );
  if (!records || !fields) {
    console.warn(`Nothing found for ${parcelID} on table ${table}.`);
    return undefined;
  }
  return { fields: toFieldLookup(fields), records: records };
}

export const fetchAssessmentRecord = (parcelID: string) =>
  fetchSingleParcelRecord(parcelID, ParcelTable.Assessment);
export const fetchParcelBoundariesRecord = (parcelID: string) =>
  fetchSingleParcelRecord(parcelID, ParcelTable.ParcelBoundaries);
export const fetchFiledAssessmentAppealsRecord = (parcelID: string) =>
  fetchSingleParcelRecord(parcelID, ParcelTable.FiledAssessmentAppeals);

export const fetchPropertySaleTransactionsRecords = (parcelID: string) =>
  fetchMultipleParcelRecords(parcelID, ParcelTable.PropertySaleTransactions);
export const fetchAssessmentAppealsRecords = (parcelID: string) =>
  fetchSingleParcelRecord(parcelID, ParcelTable.AssessmentAppeals);
export const fetchPLIPermitRecords = (parcelID: string) =>
  fetchSingleParcelRecord(parcelID, ParcelTable.PLIPermit);
export const fetchCityViolationsRecords = (parcelID: string) =>
  fetchSingleParcelRecord(parcelID, ParcelTable.CityViolations);
export const fetchForeclosureFilingsRecords = (parcelID: string) =>
  fetchSingleParcelRecord(parcelID, ParcelTable.ForeclosureFilings);
export const fetchTaxLiensWithCurrentStatusRecords = (parcelID: string) =>
  fetchSingleParcelRecord(parcelID, ParcelTable.TaxLiensWithCurrentStatus);
export const fetchConservatorshipRecordRecords = (parcelID: string) =>
  fetchSingleParcelRecord(parcelID, ParcelTable.ConservatorshipRecord);
