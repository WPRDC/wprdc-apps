import type { DatastoreField, DatastoreRecord } from "@wprdc/types";
import type { Dataset } from "@/datasets";

const COMMON_SKIPPED_FIELDS = ["_id", "_geom", "_geom_webmercator"];

export const datasetFieldFilter =
  (dataset: Dataset) =>
  (field: DatastoreField): boolean => {
    const { ignoredFields = [], parcelIDField } = dataset;
    return fieldFilter([...ignoredFields, parcelIDField])(field);
  };

export const fieldFilter =
  <T extends DatastoreRecord>(skippedFields: string[]) =>
  (field: DatastoreField<T>) =>
    ![...COMMON_SKIPPED_FIELDS, ...skippedFields].includes(String(field.id));

export function formatShortDate(date: Date): string {
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(
    date,
  );
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}-${hour}${minute}`;
}

/**
 * A preliminary check to see if a string could be a parcel ID.
 *
 * !!! Does not guarantee that the parcel ID exists
 * Useful for immediate parsing feedback on obvious issues.
 *
 * @param parcelID - potential parcelID string to test
 */
export function isValidParcelIDForm(parcelID: string): boolean {
  const test = /[a-zA-Z0-9]{16}/g;
  return test.exec(parcelID) !== null;
}
