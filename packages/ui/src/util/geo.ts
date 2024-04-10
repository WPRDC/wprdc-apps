import type { GeoJSONFeature } from "@wprdc/types";
import type { MultiPolygon, Polygon } from "geojson";

/** Takes an array of GeoJSON polygons and flattens them into one GeoJSON MultiPolygon */
export function flattenPolygons(
  polygons: GeoJSONFeature<Polygon>[],
): GeoJSONFeature<MultiPolygon> {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "MultiPolygon",
      coordinates: polygons.map((polygon) => polygon.geometry.coordinates),
    },
  };
}
