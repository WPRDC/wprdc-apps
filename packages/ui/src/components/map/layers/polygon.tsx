import { useMemo } from "react";
import { Layer } from "react-map-gl/maplibre";
import type { SymbologyLayerProps } from "../Map.types";
import { parseConfig } from "../parse";
import { Selection } from "react-aria-components";

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
    textField,
    textSize,
  } = useMemo(() => {
    return parseConfig(layer, context);
  }, [layer, context]);

  // hide layers if they are hidden in map state


  let filter = layer.renderOptions?.filter;


  console.log(color)


  return (
    <>
      <Layer
        filter={filter ?? true}
        id={`${slug}-fill`}
        maxzoom={layer.tileSource.maxZoom ?? 22}
        minzoom={layer.tileSource.minZoom ?? 0}
        paint={{
          "fill-color": color,
          "fill-opacity": opacity,
        }}
        source={slug}
        source-layer={sourceLayer}
        type="fill"
      />
      <Layer
        filter={filter ?? true}
        id={`${slug}-line`}
        layout={{
          "line-cap": "round",
          "line-join": "miter",
          "line-sort-key": lineSortKey ?? 1,
        }}
        maxzoom={layer.tileSource.maxZoom ?? 22}
        minzoom={layer.tileSource.minZoom ?? 0}
        paint={{
          "line-color": borderColor,
          "line-opacity": borderOpacity,
          "line-width": borderWidth,
        }}
        source={slug}
        source-layer={sourceLayer}
        type="line"
      />
      {textField ? (
        <Layer
          filter={filter ?? true}
          type="symbol"
          id={`${slug}-label`}
          layout={{
            "text-field": textField,
            "text-size": textSize,
            "text-font": [
              "ui-sans-serif Bold",
              "system-ui Bold",
              "sans-serif Bold",
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
              '"Noto Color Emoji"',
            ],
          }}
          paint={{
            "text-halo-width": 1,
            "text-halo-color": "rgb(255,255,255, 0.8)",
            // "text-halo-blur": 1,
          }}
          maxzoom={layer.tileSource.maxZoom ?? 22}
          minzoom={layer.tileSource.minZoom ?? 0}
          source={slug}
          source-layer={sourceLayer}
        />
      ) : null}
    </>
  );
}
