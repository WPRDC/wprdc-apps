import type { Selection } from "@react-types/shared";
import type { LayerConfig } from "./layer";

export * from "./symbology";
export * from "./layer";
export * from "./shared";
export * from "./legend";

export type { Feature as GeoJSONFeature } from "geojson";

export interface BasemapOptions {
  /** URL for source */
  url: string;
  /** Name of the basemap */
  label: string;
}

export interface MapContextOptions {
  selection?: Record<string, Selection>;
  selectedLayers?: LayerConfig[];
  onSelectionChange?: (category: string) => (sel: Selection) => void;
}
