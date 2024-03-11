import { Layer } from "react-map-gl/maplibre";
import type { LayerContext, LayerOptions, SymbologyProps } from "@wprdc/types";
import { darken, generateColorExpression } from "../util";

interface PointLayerProps {
  layer: LayerOptions<SymbologyProps>;
  sourceLayer: string;
  context: LayerContext;
}

export function CircleLayer({
  layer,
  sourceLayer,
}: PointLayerProps): React.ReactElement {
  const { slug } = layer;

  const color = generateColorExpression(layer);
  const borderColor = generateColorExpression(layer, darken());

  return (
    <Layer
      filter={layer.filter ?? true}
      id={`${slug}-circle`}
      layout={{}}
      paint={{
        "circle-color": color,
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 3, 9, 8],
        "circle-stroke-color": borderColor,
        "circle-stroke-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          10,
          1,
          15,
          2,
        ],
      }}
      source={slug}
      source-layer={sourceLayer}
      type="circle"
    />
  );
}
