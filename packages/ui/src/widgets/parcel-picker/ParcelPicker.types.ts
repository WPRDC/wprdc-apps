import type { GeoJSONFeature } from "@wprdc/types";

export interface ParcelPickerProps {
  mapTilerAPIKey?: string;
  onSelectionChange?: (options: ParcelSelectionOptions) => void;
}

export interface ParcelSelectionOptions {
  /** Map of layer IDs to a list of feature IDs from that layer that have been selected */
  selectedFeatures?: Record<string, string[]>;

  /** List of shapes under which parcels should be searched */
  drawnAreas?: GeoJSONFeature[];

  // todo: add custom SQL query
}
