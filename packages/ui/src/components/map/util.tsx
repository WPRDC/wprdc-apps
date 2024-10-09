import type { DataDrivenPropertyValueSpecification } from "@maplibre/maplibre-gl-style-spec";
import type {
  InteractiveSymbologyProps,
  LayerConfig,
  MapState,
} from "@wprdc/types";
import { GeoType } from "@wprdc/types";
import chroma from "chroma-js";
import type {
  MapGeoJSONFeature,
  MapLayerMouseEvent,
} from "react-map-gl/maplibre";

export const darken =
  (amount?: number) =>
  (color: string): string =>
    chroma(color).darken(amount).hex();

export const lighten =
  (amount?: number) =>
  (color: string): string =>
    chroma(color).brighten(amount).hex();

export function extractFeatures(
  e: MapLayerMouseEvent,
): MapGeoJSONFeature[] | null {
  if (!e.features?.length) {
    return null;
  }
  const features = e.features.filter(
    (f) => f.properties.parcel_id !== "COMMON GROUND",
  );

  // if nothing found in list of features, they must all be COMMON GROUND
  if (!features.length) return [e.features[0]];
  // if only one makes it past the filter, it's a parcel we care about
  if (features.length === 1) return [features[0]];
  // otherwise return the list of non common ground parcels
  return features;
}

export const DEFAULT_LINE_OPACITY = 0.9;
export const DEFAULT_FILL_OPACITY = 0.7;
export const DEFAULT_BORDER_WIDTH: DataDrivenPropertyValueSpecification<number> =
  ["interpolate", ["linear"], ["zoom"], 5, 1, 15, 1, 17, 4];
export const DEFAULT_LINE_WIDTH: DataDrivenPropertyValueSpecification<number> =
  ["interpolate", ["linear"], ["zoom"], 5, 0.5, 12, 1, 14, 7];
export const DEFAULT_SELECTED_COLOR = "cyan";
export const DEFAULT_COLOR = "#000";

export const DEFAULT_TEXT_SIZE = 12;

export function getInteractiveLayerID(layer: LayerConfig): string {
  switch (layer.type) {
    case GeoType.Point:
      return `${layer.slug}-circle`;
    case GeoType.Line:
      return `${layer.slug}-line`;
    case GeoType.Polygon:
      return `${layer.slug}-fill`;
  }
}

export function getSelectedID(
  layer: LayerConfig<InteractiveSymbologyProps>,
  context: MapState,
): string | undefined {
  return (context.selectedIDs?.[layer.slug] ?? [])[0];
}

export function getPrimaryHoveredID(
  layer: LayerConfig<InteractiveSymbologyProps>,
  context: MapState,
): string | undefined {
  const { hoveredFeatures } = context;
  if (!hoveredFeatures) return undefined;
  const primaryFeature = hoveredFeatures.find((f) => f.source === layer.slug);
  return primaryFeature?.properties[layer.interaction.idField] as
    | string
    | undefined;
}
