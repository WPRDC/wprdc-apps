import type { LayerOptions, LayerContext, SymbologyProps } from "@wprdc/types";
import { Layer } from "react-map-gl/maplibre";
import { generateColorExpression } from "../util";

interface SymbolLayerProps {
  layer: LayerOptions<SymbologyProps>;
  sourceLayer: string;
  context: LayerContext;
}

export function LineLayer({
  layer,
  sourceLayer,
  context,
}: SymbolLayerProps): React.ReactElement {
  const { slug } = layer;

  const color = generateColorExpression(layer);

  const borderWidth =
    typeof layer.borderWidth === "function"
      ? layer.borderWidth(context)
      : layer.borderWidth;

  return (
    <Layer
      filter={layer.filter ?? true}
      id={`${slug}-line`}
      layout={{}}
      paint={{
        "line-color": color,
        "line-width": borderWidth ?? [
          "interpolate",
          ["linear"],
          ["zoom"],
          5,
          0.5,
          12,
          1,
          14,
          7,
        ],
      }}
      source={slug}
      source-layer={sourceLayer}
      type="line"
    />
  );
}
