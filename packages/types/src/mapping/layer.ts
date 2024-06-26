import type { FilterSpecification } from "maplibre-gl";
import type { ReactNode } from "react";
import { type ExpressionSpecification } from "@maplibre/maplibre-gl-style-spec";
import type { GeoType, Identifiable, Publisher } from "../shared";
import type { SymbologyProps } from "./symbology";
import type { LegendGroupOptions } from "./legend";

export interface LayerSource extends Identifiable {
  /** URL to source or to information about it.  Used in links. */
  url: string;

  /** CKAN resource ID for CKAN resources */
  resourceID: string;
}

/** Properties common among all layers */
export interface CommonLayerOptions extends Identifiable {
  /** Description of the layer/dataset */
  description: string;

  /** Type of geometry used in layer */
  type: GeoType;

  /** Data source being visualized by layer */
  source: LayerSource;

  /** Publisher details */
  publisher: Publisher;

  /** Geographic extent of the layer */
  extent: string;

  /** Options that define the layer's legend item if one */
  legend?: LegendGroupOptions;

  /** Hides layer if true */
  hidden?: boolean;

  /*
   * TODO: SQL query from which to generate layer
   *  if not provided, SELECT * FROM {resourceID} will be used
   */
  // sql?: string;

  /** URL of tile JSON to override as source */
  tileJSONSource: string;

  /** Override source-layer  */
  sourceLayer: string;

  /** Override min zoom */
  minZoom?: number;

  /** Override max zoom */
  maxZoom?: number;

  /** Filter dataset */
  filter?: FilterSpecification;

  /** Set to true to ignore layer when generating legend */
  noLegend?: boolean;
}

/** Define how to visualize a field in a popup */
export interface PopupFieldOptions {
  /** Field ID - key in feature properties from which to grab data */
  field: string;
  /** Label for field */
  label: string;
  /** Function that formats value data to something renderable */
  format?: (value: string) => ReactNode;
  /** Use this field's value as the popup title */
  asTitle?: boolean;
}

/** Select fields used to e feature labels */
export interface LabelOptions {
  labelTextField?: ExpressionSpecification;
  subTitleTextField?: ExpressionSpecification;
}

/** Add common options to a specific symbology layer type */
export type LayerConfig<V extends SymbologyProps = SymbologyProps> =
  CommonLayerOptions & LabelOptions & V;
