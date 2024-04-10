import type { DatastoreField, DatastoreRecord } from "@wprdc/types";

const COMMON_SKIPPED_FIELDS = [
  "_id",
  "PARID",
  "parid",
  "parcel_id",
  "pin",
  "PIN",
  "",
];

export const createFilter =
  <T extends DatastoreRecord>(ignoredFields: string[]) =>
  (field: DatastoreField<T>) => {
    const skippedFields: string[] = [
      ...COMMON_SKIPPED_FIELDS,
      ...ignoredFields,
    ];
    return !skippedFields.includes(String(field.id));
  };

export const assessmentFilter = createFilter;
