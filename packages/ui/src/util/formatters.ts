import type {
  DatastoreField,
  Formatter,
  PropertyAssessment,
  Value,
} from "@wprdc/types";
import type { ReactNode } from "react";

export interface AddressParts {
  number?: string;
  fraction?: string;
  unit?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export function makeAddress(
  parts: AddressParts,
): [string | undefined, string | undefined] {
  let addressLine = [parts.number, parts.fraction, parts.street].join(" ");

  if ((parts.unit ?? "").trim().length)
    addressLine = addressLine.concat(", ", parts.unit ?? "");

  const cityLine =
    parts.city && parts.state && parts.zip
      ? `${parts.city}, ${parts.state} ${parts.zip}`
      : undefined;
  return [addressLine, cityLine];
}

export function makeAssessmentAddress(
  data?: PropertyAssessment,
): [string | undefined, string | undefined] {
  return makeAddress({
    number: data?.PROPERTYHOUSENUM,
    fraction: data?.PROPERTYFRACTION,
    unit: data?.PROPERTYUNIT ?? undefined,
    street: data?.PROPERTYADDRESS,
    city: data?.PROPERTYCITY,
    state: data?.PROPERTYSTATE,
    zip: data?.PROPERTYZIP,
  });
}

export function formatValue<T extends Value = Value>(
  value?: T,
  formatter?: Formatter<T>,
  emptyMessage?: ReactNode,
): ReactNode {
  if (!value && value !== 0 && value !== false) return emptyMessage;

  if (!formatter) {
    if (typeof value === "boolean") {
      return String(value).charAt(0).toUpperCase() + String(value).slice(1);
    }
    return String(value);
  }
  return formatter(value);
}

export function formatDollars(
  value?: number,
  options: Intl.NumberFormatOptions = {},
): string | undefined {
  if (!value && value !== 0) return undefined;

  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    ...options,
  });
}

export function formatDate(date: string): string {
  return new Date(date).toISOString().substring(0, 10);
}

/** Converts an array of field definitions into a data dict csv */
export function asDataDict(
  fields: DatastoreField[],
  options: { noHeader?: boolean; table?: string } = {},
): string {
  let columns = ["field", "label", "type", "notes"];
  if (options.table) columns = ["table"].concat(columns);
  const header = options.noHeader ? "" : `${columns.join(",")}\n`;

  const tableValues: (string | undefined)[] = options.table
    ? [options.table]
    : [];

  return fields.reduce<string>((acc, cur) => {
    const values = tableValues
      .concat([
        cur.id,
        (cur.info?.label ?? "").trim(),
        cur.type,
        (cur.info?.notes ?? "").trim(),
      ])
      .map((v) => `"${v ?? ""}"`);
    return `${acc}${values.join(",")}\n`;
  }, header);
}
