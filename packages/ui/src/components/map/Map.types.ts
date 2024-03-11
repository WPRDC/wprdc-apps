/**
 *
 * Map types
 *
 **/
import type * as React from "react";
import type {
  GeoType,
  LayerOptions,
  LayerContext,
  SymbologyProps,
} from "@wprdc/types";
import type { MapLayerMouseEvent } from "react-map-gl/maplibre";
import type { Selection } from "react-aria-components";
import type { ColorSpecification } from "@maplibre/maplibre-gl-style-spec";

export interface MapProps {
  children?: React.ReactNode;
  onClick?: (e: MapLayerMouseEvent) => void;
  onHover?: (e: MapLayerMouseEvent) => void;
  mapTilerAPIKey?: string;
}

export interface BasemapOptions {
  url: string;
  label: string;
  dark?: boolean;
}

export interface LayerMenuGroup {
  label: string;
  layers: LayerOptions<SymbologyProps>[];
}

export interface LayerProviderProps<K extends string = string> {
  children: React.ReactNode;
  availableLayers: Record<K, LayerMenuGroup>;
  defaultSelection?: Record<K, Selection>;
}

export interface LayerGroupProps {
  layer: LayerOptions<SymbologyProps>;
  context: LayerContext;
}

export interface LegendProps {
  layers?: LayerOptions<SymbologyProps>[];
}

export interface LegendItemProps<P extends SymbologyProps = SymbologyProps> {
  layer: LayerOptions<P>;
}

export interface LegendRowProps {
  label: string;
  color?: ColorSpecification;
  borderColor?: ColorSpecification;
  type: GeoType;
}
