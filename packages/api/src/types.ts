import { DatastoreField, DatastoreRecord } from "@wprdc/types";

export interface QueryResult<T extends DatastoreRecord> {
  fields: DatastoreField<T>[];
  records: T[];
}

export type FieldRecord<T extends object> = Record<keyof T, T>;

export interface APISingleResult<T extends DatastoreRecord> {
  fields: FieldRecord<T>;
  record: T;
}

export interface APIMultiResult<T extends DatastoreRecord> {
  fields: FieldRecord<T>;
  records: T[];
}
