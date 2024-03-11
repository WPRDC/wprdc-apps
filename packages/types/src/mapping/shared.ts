import { MapGeoJSONFeature } from "react-map-gl/maplibre";

export interface LayerContext {
  hoveredFeatures?: MapGeoJSONFeature[] | null;
  selectedParcel?: string;
}
