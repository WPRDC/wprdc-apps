import type { ExpressionSpecification, FilterSpecification } from "maplibre-gl";
import type { ReactNode } from "react";
import type { GeoType, Identifiable, Publisher } from "../shared";
import {
  type InteractiveSymbologyProps,
  type SymbologyProps,
} from "./symbology";
import type { LegendGroupOptions } from "./legend";

export interface LayerSource extends Identifiable {
  /** URL to source or to information about it.  Used in links. */
  url: string;

  /** CKAN resource ID for CKAN resources */
  resourceID: string;
}

export interface TileSource {
  /** URL of tile JSON to override as source */
  tileJSONSource: string;

  /** Override source-layer  */
  sourceLayer: string;

  /** Override min zoom */
  minZoom?: number;

  /** Override max zoom */
  maxZoom?: number;
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

  /** Tileserver details */
  tileSource: TileSource;

  /** Options that define the layer's legend item if one */
  legend?: LegendGroupOptions;

  renderOptions?: {
    /** Filter dataset */
    filter?: FilterSpecification;

    /** Set to true to ignore layer when generating legend */
    noLegend?: boolean;
  };
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

export interface InteractionOptions {
  /**
   * Property of layer feature that represents a unique ID.
   *  Used for selection and hover style states.
   */
  idField: string;

  /** Maplibre expression that indicates which features to ignore wrt interaction */
  ignoreCase?: ExpressionSpecification;

  /**
   *  Mustache template that renders the contents of the popup on hover
   *
   * todo: decide what data gets passed to template
   */
  hoverPopupContent: string;

  /**
   *  Mustache template that renders the contents of the popup on click
   *
   * todo: decide what data gets passed to template
   */
  clickPopupContent: string;

  // DEPRECATED
  clickPopupFormat?: string;
  hoverPopupFormat?: string;
}

/** Add common options to a specific symbology layer type */
export type LayerConfig<T extends SymbologyProps = SymbologyProps> =
  T extends InteractiveSymbologyProps
    ? CommonLayerOptions & {
        interaction: InteractionOptions;
      } & T
    : CommonLayerOptions & {
        interaction?: InteractionOptions;
      } & T;
