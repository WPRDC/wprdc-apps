import { ReactNode } from "react";

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

export type Formatter<T extends Value = Value> = (value?: T) => ReactNode;

export type Value = string | number | boolean | undefined;

export interface FormattedValue<T extends Value = Value> {
  value: T;
  format: Formatter<T>;
}
