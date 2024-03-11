import { DatastoreField, DatastoreRecord, FieldRecord } from "@wprdc/types";

export interface QueryResult<T extends DatastoreRecord> {
  fields?: DatastoreField<T>[];
  records?: T[];
}

export interface APIResult<T extends DatastoreRecord> {
  fields?: FieldRecord<T>;
  records?: T[];
}
