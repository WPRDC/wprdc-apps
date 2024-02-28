import { MapGeoJSONFeature } from "react-map-gl/maplibre";
import { ReactNode } from "react";

export * from "./symbology";
export * from "./layer";

export interface BasemapOptions {
  /** URL for source */
  url: string;
  /** Name of the basemap */
  label: string;
}
