import { Layer } from "react-map-gl/maplibre";
import type { DataDrivenPropertyValueSpecification } from "@maplibre/maplibre-gl-style-spec";
import type { LayerOptions, LayerContext, SymbologyProps } from "@wprdc/types";
import { darken, generateColorExpression } from "../util";

interface SymbolLayerProps {
  layer: LayerOptions<SymbologyProps>;
  sourceLayer: string;
  context: LayerContext;
}

export function PolygonLayer({
  layer,
  sourceLayer,
  context,
}: SymbolLayerProps): React.ReactElement {
  const {
    slug,
    opacity: _opacity,
    borderWidth: _borderWidth,
    borderOpacity: _borderOpacity,
  } = layer;

  const color = generateColorExpression(layer);
  const borderColor = generateColorExpression(layer, darken(20));

  const borderOpacity =
    typeof _borderOpacity === "function"
      ? _borderOpacity(context)
      : _borderOpacity;

  const borderWidth =
    typeof _borderWidth === "function" ? _borderWidth(context) : _borderWidth;

  let opacity: DataDrivenPropertyValueSpecification<number> = 0.7;
  if (!!_opacity || _opacity === 0) {
    if (typeof _opacity === "function") {
      opacity = _opacity(context);
    } else {
      opacity = _opacity;
    }
  }

  return (
    <>
      <Layer
        filter={layer.filter ?? true}
        id={`${slug}-fill`}
        paint={{
          "fill-color": color,
          "fill-opacity": opacity ?? 0.7,
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
        paint={{
          "line-color": borderColor,
          "line-opacity": borderOpacity ?? 1,
          "line-width": borderWidth ?? [
            "interpolate",
            ["linear"],
            ["zoom"],
            5,
            1,
            15,
            1,
            17,
            4,
          ],
        }}
        source={slug}
        source-layer={sourceLayer}
        type="line"
      />
    </>
  );
}
