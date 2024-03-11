import { StyleMode } from "@wprdc/types";
import type {
  LayerOptions,
  QualitativeSymbologyProps,
  SolidSymbologyProps,
} from "@wprdc/types";
import type { SourceFunctionSpecification } from "@maplibre/maplibre-gl-style-spec";
import tinycolor from "tinycolor2";
import type {
  MapGeoJSONFeature,
  MapLayerMouseEvent,
} from "react-map-gl/maplibre";

export function generateSolidColorExpression(
  layer: LayerOptions<SolidSymbologyProps>,
  styler?: (color: string) => string,
): string {
  if (styler) return styler(layer.color);
  return layer.color;
}

export function generateQualitativeColorExpression(
  layer: LayerOptions<QualitativeSymbologyProps>,
  styler: (color: string) => string = (c) => c,
): SourceFunctionSpecification<string> {
  return {
    property: layer.colors.field,
    type: "categorical",
    stops: Object.entries(layer.colors.categories).map(([k, v]) => [
      k,
      styler(v.color),
    ]),
  };
}

export function generateColorExpression(
  layer:
    | LayerOptions<SolidSymbologyProps>
    | LayerOptions<QualitativeSymbologyProps>,
  styler?: (color: string) => string,
) {
  if (layer.styleMode === StyleMode.Solid)
    return generateSolidColorExpression(layer, styler);
  if (layer.styleMode === StyleMode.Qualitative)
    return generateQualitativeColorExpression(layer, styler);
}

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
    (f) => f.properties.PIN != "COMMON GROUND",
  );

  // if nothing found in list of features, they must all be COMMON GROUND
  if (!features.length) return [e.features[0]];
  // if only one makes it past the filter, it's a parcel we care about
  if (features.length === 1) return [features[0]];
  // otherwise return the list of non common ground parcels
  return features;
}
