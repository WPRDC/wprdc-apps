import { MapGeoJSONFeature } from "react-map-gl/maplibre";
import { DataDrivenPropertyValueSpecification } from "@maplibre/maplibre-gl-style-spec";
import { Point } from "maplibre-gl";

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

export type Coordinate = [number, number];
