import type {
  DataDrivenPropertyValueSpecification,
  ExpressionSpecification,
} from "@maplibre/maplibre-gl-style-spec";
import tinycolor from "tinycolor2";
import type {
  MapGeoJSONFeature,
  MapLayerMouseEvent,
} from "react-map-gl/maplibre";
import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const darken =
  (amount?: number) =>
  (color: string): string =>
    tinycolor(color).darken(amount).toString();

export const lighten =
  (amount?: number) =>
  (color: string): string =>
    tinycolor(color).lighten(amount).toString();

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

const thing: ExpressionSpecification = [
  "case",
  ["!=", ["get", "parcel_id"], "COMMON GROUND"],
  "#000",
  [
    "case",
    ["==", ["get", "parcel_id"], ""],
    "red",
    ["case", ["==", ["get", "parcel_id"], "0125M00143000000"], "blue", "#000"],
  ],
];

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
