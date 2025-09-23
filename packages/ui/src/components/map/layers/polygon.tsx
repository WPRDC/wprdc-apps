import { useMemo } from "react";
import { Layer } from "react-map-gl/maplibre";
import type { SymbologyLayerProps } from "../Map.types";
import { parseSymbology } from "../parse";
import {
  LayerConfig,
  RawPolygonSymbologyConfig,
  SimplifiedSymbologyConfig,
} from "@wprdc/types";

export function PolygonLayer({
  layer,
  sourceLayer,
  context,
}: SymbologyLayerProps) {
  if (layer.symbology.mode === "raw") {
    const { slug } = layer;
    const filter = layer.renderOptions?.filter;
    const symbology = layer.symbology as RawPolygonSymbologyConfig;
    return (
      <>
        <Layer
          id={`${slug}-fill`}
          source={slug}
          source-layer={sourceLayer}
          type="fill"
          filter={filter ?? true}
          maxzoom={layer.tiles.maxZoom ?? 22}
          minzoom={layer.tiles.minZoom ?? 0}
          paint={symbology.fillPaint}
          layout={symbology.fillLayout}
        />
        <Layer
          id={`${slug}-fill`}
          source={slug}
          source-layer={sourceLayer}
          type="line"
          filter={filter ?? true}
          maxzoom={layer.tiles.maxZoom ?? 22}
          minzoom={layer.tiles.minZoom ?? 0}
          paint={symbology.linePaint}
          layout={symbology.lineLayout}
        />
      </>
    );
  }

  return (
    <SimplePolygonLayer
      layer={layer}
      sourceLayer={sourceLayer}
      context={context}
    />
  );
}

function SimplePolygonLayer({
  layer,
  sourceLayer,
  context,
}: SymbologyLayerProps): React.ReactElement {
  const { slug } = layer;

  const {
    fillColor,
    fillOpacity,
    strokeColor,
    strokeWidth,
    strokeOpacity,
    lineSortKey,
    textField,
    textSize,
  } = useMemo(() => {
    return parseSymbology(
      layer as LayerConfig<SimplifiedSymbologyConfig>,
      context,
    );
  }, [layer, context]);

  // hide layers if they are hidden in map state

  let filter = layer.renderOptions?.filter;

  return (
    <>
      <Layer
        id={`${slug}-fill`}
        source={slug}
        source-layer={sourceLayer}
        type="fill"
        filter={filter ?? true}
        maxzoom={layer.tiles.maxZoom ?? 22}
        minzoom={layer.tiles.minZoom ?? 0}
        paint={{
          "fill-color": fillColor,
          "fill-opacity": fillOpacity,
        }}
      />
      <Layer
        filter={filter ?? true}
        id={`${slug}-line`}
        layout={{
          "line-cap": "round",
          "line-join": "miter",
          "line-sort-key": lineSortKey ?? 1,
        }}
        maxzoom={layer.tiles.maxZoom ?? 22}
        minzoom={layer.tiles.minZoom ?? 0}
        paint={{
          "line-color": strokeColor,
          "line-opacity": strokeOpacity,
          "line-width": strokeWidth,
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
          maxzoom={layer.tiles.maxZoom ?? 22}
          minzoom={layer.tiles.minZoom ?? 0}
          source={slug}
          source-layer={sourceLayer}
        />
      ) : null}
    </>
  );
}
