/**
 *
 * Map types
 *
 **/
import type {
  DrawCreateEvent,
  DrawDeleteEvent,
  DrawModeChangeEvent,
  DrawUpdateEvent,
} from "@mapbox/mapbox-gl-draw";
import type MapboxDraw from "@mapbox/mapbox-gl-draw";
import type {
  ColorSpecification,
  DataDrivenPropertyValueSpecification,
} from "@maplibre/maplibre-gl-style-spec";
import type {
  GeoType,
  LayerConfig,
  MapState,
  SelectionRecord,
} from "@wprdc/types";
import type * as React from "react";
import { type ReactNode } from "react";
import type { Selection } from "react-aria-components";
import type {
  ControlPosition,
  MapGeoJSONFeature,
  MapLayerMouseEvent,
  Point,
  ViewState,
  ViewStateChangeEvent,
} from "react-map-gl/maplibre";
import { type StaticImageData } from "next/image";

export type MouseEventContext = MapState;

export interface MapProps {
  id?: string;

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

  onZoom?: (zoom: number, context: MapState, e: ViewStateChangeEvent) => void;

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

  /** Show zoom info overlay */
  showZoom?: boolean;

  /** Callback used when clicking map to navigate */
  onNavigate?: (feature: MapGeoJSONFeature, mapState: MapState) => void;

  /** Override map's CSS style */
  style?: React.CSSProperties;

  /**
   * Whether the scroll wheel will zoom the map (default: true)
   *
   * Used with custom implementations of toggling scrollZoom (e.g. holding ctrl key)
   */
  scrollZoom?: boolean;

  /**
   * Provides a switch to toggle scroll zoom. (default: false)
   *
   * Can be used in conjunction with outside control using `scrollZoom`.
   *  A `true` value from the control will override `scrollZoom` value.
   */
  withScrollZoomControl?: boolean;

  /** Default value for scrollZoom control if using withScrollZoomControl (default: false) */
  defaultScrollZoom?: boolean;

  /** Manually specify interactive layers */
  interactiveLayerIDs?: string[];

  /** Custom hover popup component */
  hoverPopup?: ReactNode;

  onLoad?: () => void;
}

export interface BasemapOptions {
  url: string;
  label: string;
  image: string | StaticImageData;
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
  lineSortKey?: DataDrivenPropertyValueSpecification<number>;
  textField?: DataDrivenPropertyValueSpecification<string>;
  textSize?: DataDrivenPropertyValueSpecification<number>;
}

export type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;

  onCreate?: (evt: DrawCreateEvent) => void;
  onDelete?: (evt: DrawDeleteEvent) => void;
  onUpdate?: (evt: DrawUpdateEvent) => void;
  onModeChange?: (evt: DrawModeChangeEvent) => void;
};

export type DrawEvent =
  | DrawCreateEvent
  | DrawDeleteEvent
  | DrawUpdateEvent
  | DrawModeChangeEvent;

export interface PopupProps {
  features: MapGeoJSONFeature[];
  point: Point;
  getPopupID: (feature: MapGeoJSONFeature) => string;
}

export interface ClickPopupProps extends PopupProps {
  onClose: () => void;
  onNavigate: (feature: MapGeoJSONFeature) => void;
}
