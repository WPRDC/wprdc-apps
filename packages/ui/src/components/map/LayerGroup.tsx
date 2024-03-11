import { Source } from "react-map-gl/maplibre";
import { GeoType } from "@wprdc/types";
import { CircleLayer } from "./layers/circle";
import { LineLayer } from "./layers/line";
import { PolygonLayer } from "./layers/polygon";
import type { LayerGroupProps } from "./Map.types";

const sourceName = (resourceID: string): string => `table.${resourceID}._geom`;

function toTileURL(resourceID: string, sql?: string): string {
  const baseURL = "https://data.wprdc.org/tiles/";

  if (sql) {
    // todo: build function tile endpoint
    return `${baseURL}${sql}`;
  }
  return `${baseURL}${sourceName(resourceID)}`;
}

/**
 * LayerGroup that styles the map for the selected Layer
 */
export function LayerGroup({
  layer,
  context,
}: LayerGroupProps): React.ReactElement {
  const url = layer.tileJSONSource ?? toTileURL(layer.resourceID, layer.sql);

  let sourceLayer;
  if (layer.sourceLayer) {
    sourceLayer = layer.sourceLayer;
  } else if (layer.tileJSONSource) {
    sourceLayer = layer.resourceID;
  } else {
    sourceLayer = sourceName(layer.resourceID);
  }

  return (
    <Source
      id={layer.slug}
      maxzoom={layer.maxZoom ?? 22}
      minzoom={layer.minZoom ?? 5}
      type="vector"
      url={url}
    >
      {layer.type === GeoType.Point && (
        <CircleLayer
          context={context}
          layer={layer}
          sourceLayer={sourceLayer}
        />
      )}
      {layer.type === GeoType.Polygon && (
        <PolygonLayer
          context={context}
          layer={layer}
          sourceLayer={sourceLayer}
        />
      )}
      {layer.type === GeoType.Line && (
        <LineLayer context={context} layer={layer} sourceLayer={sourceLayer} />
      )}
    </Source>
  );
}
