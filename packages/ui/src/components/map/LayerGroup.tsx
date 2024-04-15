import { Source } from "react-map-gl/maplibre";
import { GeoType } from "@wprdc/types";
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
      maxzoom={layer.maxZoom ?? 22}
      minzoom={layer.minZoom ?? 0}
      type="vector"
      url={layer.tileJSONSource}
    >
      {layer.type === GeoType.Point && (
        <CircleLayer
          context={context}
          layer={layer}
          sourceLayer={layer.sourceLayer}
        />
      )}
      {layer.type === GeoType.Polygon && (
        <PolygonLayer
          context={context}
          layer={layer}
          sourceLayer={layer.sourceLayer}
        />
      )}
      {layer.type === GeoType.Line && (
        <LineLayer
          context={context}
          layer={layer}
          sourceLayer={layer.sourceLayer}
        />
      )}
    </Source>
  );
}
