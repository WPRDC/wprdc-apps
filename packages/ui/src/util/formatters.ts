import type { Formatter, PropertyAssessment, Value } from "@wprdc/types";
import type { ReactNode } from "react";

export function makeAddress(
  data?: PropertyAssessment,
): [string | undefined, string | undefined] {
  if (!data) return [undefined, undefined];

  let addressLine = [
    data.PROPERTYHOUSENUM,
    data.PROPERTYFRACTION,
    data.PROPERTYADDRESS,
  ].join(" ");

  if ((data.PROPERTYUNIT ?? "").trim().length)
    addressLine = addressLine.concat(", ", data.PROPERTYUNIT ?? "");

  const cityLine =
    data.PROPERTYCITY && data.PROPERTYSTATE && data.PROPERTYZIP
      ? `${data.PROPERTYCITY}, ${data.PROPERTYSTATE} ${data.PROPERTYZIP}`
      : undefined;
  return [addressLine, cityLine];
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

export function formatDollars(value?: number): string | undefined {
  if (!value && value !== 0) return undefined;
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function formatDate(date: string): string {
  return new Date(date).toISOString().substring(0, 10);
}
