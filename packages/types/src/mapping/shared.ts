import type { MapGeoJSONFeature } from "react-map-gl/maplibre";
import type { DataDrivenPropertyValueSpecification } from "@maplibre/maplibre-gl-style-spec";
import type { Point } from "maplibre-gl";

export type SelectionRecord = Record<string, string[]>;

export interface MapState {
  selectedIDs?: SelectionRecord;
  hoveredFeatures?: MapGeoJSONFeature[] | null;
  clickedFeatures?: MapGeoJSONFeature[] | null;
  hoveredPoint?: Point | null;
  clickedPoint?: Point | null;
}

export type SpecGenerator<T> = (context: MapState) => T;

export type WithGenerator<T> =
  | DataDrivenPropertyValueSpecification<T>
  | SpecGenerator<DataDrivenPropertyValueSpecification<T>>;

export type CoordinatePair = [number, number];
