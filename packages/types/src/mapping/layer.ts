import { Extent, GeoType, IDed, Publisher } from "../shared";
import { FilterSpecification } from "maplibre-gl";
import { SymbologyProps } from "./symbology";
import { LegendGroupOptions } from "./legend";
import { ReactNode } from "react";

/** Properties common among all layers */
export interface CommonLayerOptions extends IDed {
  /** Type of geometry used in layer */
  type: GeoType;

  /** Description of the layer/dataset */
  description: string;

  /* Data source visualized by layer */
  source: {
    title: string;
    url: string;
  };
  /** CKAN resource ID */
  resourceID: string;

  /** Publisher details */
  publisher: Publisher;

  /** Geographic extent of the layer */
  extent: Extent;

  /** If true, the features can be clicked */
  interactive?: boolean;

  /** Options that define the layer's legend item if one */
  legend?: LegendGroupOptions;

  /** Options that define the layer's popup if one*/
  popup?: PopupOptions;

  /** Hides layer if true */
  hidden?: boolean;

  /**
   * SQL query from which to generate layer
   *  if not provided, SELECT * FROM {resourceID} will be used
   */
  sql?: string;

  /** URL of tile JSON to override as source */
  tileJSONSource?: string;

  /** Override source-layer  */
  sourceLayer?: string;

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

/** Options used by map popups */
export interface PopupOptions {
  /** Title to display at top of popup */
  title?: string;
  /** Field props */
  fields: [];
}

/** Add common options to a specific symbology layer type */
export type LayerOptions<V extends SymbologyProps> = CommonLayerOptions & V;
