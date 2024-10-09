// Common p

import type { ReactNode } from "react";

/** Possible value from datastore query */
export type Value = string | number | boolean | undefined | null;

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

export interface Identifiable {
  /** Identifier used in url paths (unique to each layer)  */
  slug: string;
  /** Human-friendly name */
  title: string;
}

export type Formatter<T extends Value = Value> = (value?: T) => ReactNode;

export interface FormattedValue<T extends Value = Value> {
  value: T;
  format: Formatter<T>;
}

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
