import {
  CircleLayerSpecification,
  FillLayerSpecification,
  LayerSpecification,
  LineLayerSpecification,
  FilterSpecification,
} from "maplibre-gl";
import { ReactNode } from "react";
import { Extent, GeoType, IDed, Publisher } from "@/types/shared";
import {
  ColorSpecification,
  DataDrivenPropertyValueSpecification,
} from "@maplibre/maplibre-gl-style-spec";
import { MapGeoJSONFeature } from "react-map-gl/maplibre";

/** Props common to all layers.*/
export interface CommonLayerOptions extends IDed {
  /** */
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

type StyleProp<T> =
  | DataDrivenPropertyValueSpecification<T>
  | ((
      context: MapContext & Record<string, any>,
    ) => DataDrivenPropertyValueSpecification<T>);

interface BaseVisualProps {
  /** Override opacity settings */
  opacity?: StyleProp<number>;
  /** Override border width */
  borderWidth?: StyleProp<number>;

  /** Override border opacity */
  borderOpacity?: StyleProp<number>;
}

export interface SolidVisualProps extends BaseVisualProps {
  visualMode: ColoringMode.Solid;
  color: ColorSpecification;
  selectedColor?: ColorSpecification;
  borderColor?: ColorSpecification;
}

export interface VizCategory {
  label: string;
  color: string;
  borderColor?: string;
}

export interface QualitativeVisualProps extends BaseVisualProps {
  visualMode: ColoringMode.Qualitative;
  /** Maps categories to their colors */
  colors: {
    /** Field to check categories against from */
    field: string;
    /** Maps categories to colors */
    categories: Record<string | number, VizCategory>;
  };
}

// todo: not needed for greenprint yet - add to VisualProps when defined
export interface SequentialVisualProps extends BaseVisualProps {}

export type VisualOptions = SolidVisualProps | QualitativeVisualProps;

export type LayerOptions<V extends VisualOptions> = CommonLayerOptions & V;

/** Group of specific legend items. One group per interface layer */
export interface LegendGroupOptions extends IDed {
  legendItems: LegendItemProps[];
}

/** Individual line in a legend */
export interface LegendItemProps extends IDed {
  /** geometry type of associated map layer - used to select an icon **/
  geoType: GeoType;
  /* style props */
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  fillColor?: string;
  fillOpacity?: number;
}

export type EditableSpecKeys = "layout" | "paint";

/** Limited to only editable fields from a layer specification type */
export type Editable<T extends LayerSpecification> = Pick<T, EditableSpecKeys>;

// Style props
export enum ColoringMode {
  Solid = "solid",
  Qualitative = "qualitative",
  // Sequential = "sequential",
}

export interface PopupOptions {
  title?: string;
  fields: {
    field: string;
    label: string;
    format?: (value: string) => ReactNode;
    asTitle?: boolean;
  }[];
}

export type BaseMapID =
  | "basic"
  | "streets"
  | "outdoors"
  | "minimal"
  | "topo"
  | "satellite";

export interface BasemapOptions {
  url: string;
  label: string;
}

export type LayerCategory =
  | "interactive"
  | "base"
  | "natural-features"
  | "other"
  | "transportation"
  | "urban-green-features"
  | "urban-green-features-planned";

export type CirclePaintSpec = NonNullable<CircleLayerSpecification["paint"]>;
export type CircleLayoutSpec = NonNullable<CircleLayerSpecification["layout"]>;
export type FillPaintSpec = NonNullable<FillLayerSpecification["paint"]>;
export type FillLayoutSpec = NonNullable<FillLayerSpecification["layout"]>;
export type LinePaintSpec = NonNullable<LineLayerSpecification["paint"]>;
export type LineLayoutSpec = NonNullable<LineLayerSpecification["layout"]>;

export type LayerPaintSpec = CirclePaintSpec | FillPaintSpec | LinePaintSpec;
export type LayerLayoutSpec =
  | CircleLayoutSpec
  | FillLayoutSpec
  | LineLayoutSpec;

export interface VizProps {
  circle?: {
    paint: CirclePaintSpec;
    layout: CircleLayoutSpec;
  };
  fill?: {
    paint: FillPaintSpec;
    layout: FillLayoutSpec;
  };
  line?: {
    paint: LinePaintSpec;
    layout: LineLayoutSpec;
  };
}

export interface MapContext {
  hoveredFeatures?: MapGeoJSONFeature[] | null;
  selectedParcel?: string;
}
