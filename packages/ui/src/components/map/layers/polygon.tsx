import { Layer } from "react-map-gl/maplibre";
import type { SymbologyLayerProps } from "../Map.types";
import { parseConfig } from "../parse";

export function PolygonLayer({
  layer,
  sourceLayer,
  context,
}: SymbologyLayerProps): React.ReactElement {
  const { slug } = layer;

  const { color, opacity, borderOpacity, borderWidth, borderColor } =
    parseConfig(layer, context);

  return (
    <>
      <Layer
        filter={layer.filter ?? true}
        id={`${slug}-fill`}
        maxzoom={layer.maxZoom ?? 22}
        minzoom={layer.minZoom ?? 0}
        paint={{
          "fill-color": color,
          "fill-opacity": opacity,
        }}
        source={slug}
        source-layer={sourceLayer}
        type="fill"
      />
      <Layer
        filter={layer.filter ?? true}
        id={`${slug}-line`}
        layout={{
          "line-cap": "round",
        }}
        maxzoom={layer.maxZoom ?? 22}
        minzoom={layer.minZoom ?? 0}
        paint={{
          "line-color": borderColor,
          "line-opacity": borderOpacity,
          "line-width": borderWidth,
        }}
        source={slug}
        source-layer={sourceLayer}
        type="line"
      />
    </>
  );
}