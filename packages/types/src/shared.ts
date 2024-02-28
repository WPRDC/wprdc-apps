// Common p

import { ReactElement, ReactNode } from "react";

/** Possible value from datastore query */
export type Value = string | number | boolean | undefined;

export type Size = "S" | "M" | "L" | "XL";

// old
export enum GeoType {
  Point = "point",
  Line = "line",
  Polygon = "polygon",
}

export interface Publisher {
  name: string;
  homepage: string;
  org: string;
}

export enum Extent {
  County = "Allegheny County",
  Pittsburgh = "Pittsburgh",
}

export interface IDed {
  /** Identifier used in url paths (unique to each layer)  */
  slug: string;
  /** Human-friendly name */
  title: string;
}

export interface FieldValue {
  id: number | string;
  label: ReactNode;
  value?: Value | ReactElement;
  format?: (value: Value) => ReactNode;
  info?: string;
}

export type Formatter<T extends Value = Value> = (value?: T) => ReactNode;

export interface FormattedValue<T extends Value = Value> {
  value: T;
  format: Formatter<T>;
}
