import type { GeoType, Identifiable } from "../shared";
import { RampType } from "./symbology.ts";

export interface SharedLegendProps extends Identifiable {
  /** geometry type of associated map layer - used to select an icon **/
  geoType: GeoType;
}

/** Individual line in a legend */
export interface LegendItemOptions {
  /* style props */
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  fillColor?: string;
  fillOpacity?: number;
}

export interface FixedLegendOptions extends SharedLegendProps {
  type: "fixed";
  style: LegendItemOptions;
  label: string;
}

export type LabeledLegendStyleRecord = Pick<
  FixedLegendOptions,
  "style" | "label" | "slug"
>;

export type RampLegendStyleRecord = Pick<FixedLegendOptions, "style" | "slug"> &
  Partial<Pick<FixedLegendOptions, "label">>;

export type RampLegendStyleRecords = [
  LabeledLegendStyleRecord,
  ...RampLegendStyleRecord[],
  LabeledLegendStyleRecord,
];

export interface CategoryLegendOptions extends SharedLegendProps {
  type: "category";

  /** Style common across all items */
  baseStyle: LegendItemOptions;

  /** Styles used for each category */
  styles: LabeledLegendStyleRecord[];

  /** Styles used for each secondary category */
  secondaryStyles?: LabeledLegendStyleRecord[];
}

export interface RampLegendOptions extends SharedLegendProps {
  type: "ramp";

  /** Style common across all items */
  baseStyle: LegendItemOptions;

  /** Style values at key points in ramp */
  styles: RampLegendStyleRecords;

  /** Interpolation type */
  rampType: RampType;

  /** Optional category styles */
  categoryStyles?: LabeledLegendStyleRecord[];
}

export type LegendOptions =
  | FixedLegendOptions
  | CategoryLegendOptions
  | RampLegendOptions;

// all fixed is easy: just make a item with the style

// if the most complicated is a category, or case it's also straightforward
//  expand out all the possible category x categories and make a block of each combination
//  for most cases, this will just be one category.  if it's 2 categories make a matrix, otherwise list out all the items (but maybe suggest against it)

// only allow one ramp.
// one ramp and all fixed: show the ramp
// one ramp and a set of categories, matrix of ramps per category
