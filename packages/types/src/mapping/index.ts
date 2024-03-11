import { Selection } from "@react-types/shared";
import { LayerOptions } from "./layer";
import { SymbologyProps } from "./symbology";

export * from "./symbology";
export * from "./layer";
export * from "./shared";
export * from "./legend";

export interface BasemapOptions {
  /** URL for source */
  url: string;
  /** Name of the basemap */
  label: string;
}

export interface MapContextOptions {
  selection?: Record<string, Selection>;
  selectedLayers?: LayerOptions<SymbologyProps>[];
  onSelectionChange?: (category: string) => (sel: Selection) => void;
}
