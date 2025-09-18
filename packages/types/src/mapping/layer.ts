import type { ExpressionSpecification, FilterSpecification } from "maplibre-gl";
import type { ReactNode } from "react";
import type { GeoType, Identifiable, Publisher } from "../shared";
import { SymbologyConfig } from "./symbology";
import type { LegendGroupOptions } from "./legend";

export interface LayerSource extends Identifiable {
  /** URL to source or to information about it.  Used in links. */
  url: string;

  /** CKAN resource ID for CKAN resources */
  resourceID: string;

  /** Publisher details */
  publisher: Publisher;
}

export interface TileSource {
  /** URL of tile JSON to override as source */
  source: string;

  /** Override source-layer  */
  sourceLayer: string;

  /** Override min zoom */
  minZoom?: number;

  /** Override max zoom */
  maxZoom?: number;
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
}

/** Properties common among all layers */
export interface LayerConfig<S extends SymbologyConfig = SymbologyConfig> extends Identifiable {
  /** Description of the layer/dataset. Can be markdown */
  description: string;

  /** Warning text. Can be markdown */
  warning?: string;

  /** Data source being visualized by layer */
  source: LayerSource;

  /** Tileserver details */
  tiles: TileSource;

  /** Configuration for the layer's feature symbology */
  symbology: S;

  /**
   * Options that define the layer's legend items.
   * Legend is automatically configured if omitted and using a simplified symbology config.
   * If using a raw symbology configuration, a legend must be manually configured to be rendered.
   * If using a simplified symbology configuration, pass `false` to skip legend generation.
   * */
  legend?: Omit<LegendGroupOptions, "geoType"> | false;

  /** Layer-wide render options */
  renderOptions?: {
    /** Filter dataset before rendering */
    filter?: FilterSpecification;
  };

  /** Settings to control hover and click behavior */
  interaction?: InteractionOptions;
}
