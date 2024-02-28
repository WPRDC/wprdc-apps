import { MapGeoJSONFeature } from "react-map-gl/maplibre";

export interface MapContext {
  hoveredFeatures?: MapGeoJSONFeature[] | null;
  selectedParcel?: string;
}
