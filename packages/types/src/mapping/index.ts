import { Selection } from "@react-types/shared";
import { SymbologyProps } from "./symbology";
import { LayerConfig } from "./layer";

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
  selectedLayers?: LayerConfig<SymbologyProps>[];
  onSelectionChange?: (category: string) => (sel: Selection) => void;
}
