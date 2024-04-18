import { Layer } from "react-map-gl/maplibre";
import { useMemo } from "react";
import type { SymbologyLayerProps } from "../Map.types";
import { parseConfig } from "../parse";

export function PolygonLayer({
  layer,
  sourceLayer,
  context,
}: SymbologyLayerProps): React.ReactElement {
  const { slug } = layer;

  const {
    color,
    opacity,
    borderOpacity,
    borderWidth,
    borderColor,
    lineSortKey,
  } = useMemo(() => {
    return parseConfig(layer, context);
  }, [layer, context]);

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
          "line-join": "miter",
          "line-sort-key": lineSortKey,
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
