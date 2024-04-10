/**
 *
 * Map types
 *
 **/
import type * as React from "react";
import type {
  GeoType,
  LayerConfig,
  MapState,
  SelectionRecord,
  GeoJSONFeature,
} from "@wprdc/types";
import type {
  ControlPosition,
  MapGeoJSONFeature,
  MapLayerMouseEvent,
  ViewState,
} from "react-map-gl/maplibre";
import type { Selection } from "react-aria-components";
import type {
  ColorSpecification,
  DataDrivenPropertyValueSpecification,
} from "@maplibre/maplibre-gl-style-spec";
import type MapboxDraw from "@mapbox/mapbox-gl-draw";

export type MouseEventContext = MapState;

export interface MapProps {
  children?: React.ReactNode;

  /** Override initial view state */
  initialViewState?: Partial<ViewState>;

  /** Callback that's fired on click */
  onClick?: (
    features: MapGeoJSONFeature[],
    context: MapState,
    e: MapLayerMouseEvent,
  ) => void;

  /** Callback that's fired on hover */
  onHover?: (
    features: MapGeoJSONFeature[],
    context: MapState,
    e: MapLayerMouseEvent,
  ) => void;

  /** Selected map features. Map of layer IDs to the features from that layer that are selected */
  selectedIDs?: SelectionRecord;

  /** API key needed for MapTiler basemaps */
  mapTilerAPIKey?: string;

  /** Layer configurations to be rendered in map */
  layers?: LayerConfig[];

  /** Minimum zoom */
  minZoom?: number;

  /** Maximum zoom */
  maxZoom?: number;

  /** Turn on drawing controls */
  useDrawControls?: boolean;

  /** Props sent draw controls */
  drawControlProps?: DrawControlProps;
}

export interface BasemapOptions {
  url: string;
  label: string;
  image: string;
  dark?: boolean;
}

export interface LayerMenuGroup {
  label: string;
  layers: LayerConfig[];
}

export interface LayerProviderProps<K extends string = string> {
  children: React.ReactNode;
  availableLayers: Record<K, LayerMenuGroup>;
  defaultSelection?: Record<K, Selection>;
}

export interface LayerGroupProps {
  layer: LayerConfig;
  context: MapState;
}

export interface LegendProps {
  layers?: LayerConfig[];
}

export interface LegendItemProps {
  layer: LayerConfig;
}

export interface LegendRowProps {
  label: string;
  color?: ColorSpecification;
  borderColor?: ColorSpecification;
  type: GeoType;
}

export interface SymbologyLayerProps {
  layer: LayerConfig;
  sourceLayer: string;
  context: MapState;
}

export interface ParseResults {
  color: DataDrivenPropertyValueSpecification<ColorSpecification>;
  opacity: DataDrivenPropertyValueSpecification<number>;
  borderColor: DataDrivenPropertyValueSpecification<ColorSpecification>;
  borderOpacity: DataDrivenPropertyValueSpecification<number>;
  borderWidth: DataDrivenPropertyValueSpecification<number>;
}

export type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;

  onCreate?: (evt: DrawCreateEvent) => void;
  onDelete?: (evt: DrawDeleteEvent) => void;
  onUpdate?: (evt: DrawUpdateEvent) => void;
};

export interface DrawCreateEvent {
  type: "draw.create";
  features: GeoJSONFeature[];
}

export interface DrawDeleteEvent {
  type: "draw.delete";
  features: GeoJSONFeature[];
  action: string;
}

export interface DrawUpdateEvent {
  type: "draw.update";
  features: GeoJSONFeature[];
}

export type DrawEvent = DrawCreateEvent | DrawDeleteEvent | DrawUpdateEvent;
