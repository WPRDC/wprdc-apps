import { MapGeoJSONFeature, MapMouseEvent, Point } from "react-map-gl/maplibre";
import type { DataDrivenPropertyValueSpecification } from "@maplibre/maplibre-gl-style-spec";
import { Selection } from "@react-types/shared";

export type SelectionRecord = Record<string, string[]>;

export interface MapState {
  selectedIDs?: SelectionRecord;
  hoveredFeatures?: MapGeoJSONFeature[] | null;
  clickedFeatures?: MapGeoJSONFeature[] | null;
  hoveredPoint: Point | null;
  clickedPoint: Point | null;
  visibleLayerCategories: Record<string, Selection>;
}

export type SpecGenerator<T> = (context: MapState) => T;

export type WithGenerator<T> =
  | DataDrivenPropertyValueSpecification<T>
  | SpecGenerator<DataDrivenPropertyValueSpecification<T>>;

export type CoordinatePair = [number, number];
