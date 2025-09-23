import { GeoType } from "@wprdc/types";
import { Source } from "react-map-gl/maplibre";
import { CircleLayer } from "./layers/circle";
import { LineLayer } from "./layers/line";
import { PolygonLayer } from "./layers/polygon";
import type { LayerGroupProps } from "./Map.types";

/**
 * LayerGroup that styles the map for the selected Layer
 */
export function LayerGroup({
  layer,
  context,
}: LayerGroupProps): React.ReactElement {
  return (
    <Source
      id={layer.slug}
      maxzoom={layer.tiles.maxZoom ?? 22}
      minzoom={layer.tiles.minZoom ?? 0}
      type="vector"
      url={layer.tiles.source}
    >
      {layer.symbology.geoType === GeoType.Point && (
        <CircleLayer
          context={context}
          layer={layer}
          sourceLayer={layer.tiles.sourceLayer}
        />
      )}
      {layer.symbology.geoType === GeoType.Polygon && (
        <PolygonLayer
          context={context}
          layer={layer}
          sourceLayer={layer.tiles.sourceLayer}
        />
      )}
      {layer.symbology.geoType === GeoType.Line && (
        <LineLayer
          context={context}
          layer={layer}
          sourceLayer={layer.tiles.sourceLayer}
        />
      )}
    </Source>
  );
}
