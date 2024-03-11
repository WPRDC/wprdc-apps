// Interfaces for datastore response data
import { Value } from "../shared";

export type DatastoreRecord = Record<string, Value>;

/** Possible data types for CKAN datastore fields */
export enum DataType {
  Text = "text",
  Number = "number",
  DateTime = "datetime",
  Boolean = "boolean",
}

/**
 * CKAN datastore field metadata
 *
 * returned from CKAN datastore_search
 * */
export interface DatastoreField<T extends DatastoreRecord> {
  /** The column name */
  id: keyof T;
  /** The data type of the field */
  type: DataType;
  /** Extra data from data dictionary */
  info?: DatastoreFieldDataDictionaryEntry;
}

/** Extra fields in datastore response pulled from data dictionary */
export interface DatastoreFieldDataDictionaryEntry {
  /** Description of field */
  notes?: string;
  /** Manually overridden type */
  type_override?: string;
  /** Human-friendly name of the field */
  label?: string;
}

/**
 * Result data within response from  CKAN datastore_search
 */
export interface QueryResult<T extends DatastoreRecord> {
  /** Resource UUID */
  resource_id: string;

  /** fields in datastore */
  fields: DatastoreField<T>[];
  /** list of rows from datastore */
  records: T[];

  /** if true, totals are included */
  include_total: true;
  /** limit of number of results returned */
  limit: number;
  /** Format that rows take in response */
  records_format: "objects";

  /** Pagination links */
  _links: {
    /** Link to first page of results */
    start: string | null;
    /** Link to next page of results */
    next: string | null;
  };
}

/**
 * Response from CKAN datastore_search endpoint
 */
export interface DatastoreSearchResponse<T extends DatastoreRecord> {
  /** URL of datastore_search help */
  help: string;
  /** True if successful query */
  success: boolean;
  /** Result of query */
  result: QueryResult<T>;
  /** Total number of rows in table */
  total: number;
  /** True if the total number of rows was estimated */
  total_was_estimated: boolean;
}

export type FieldRecord<T extends DatastoreRecord> = Record<
  keyof T,
  DatastoreField<T>
>;
