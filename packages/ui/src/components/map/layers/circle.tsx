import { useMemo } from "react";
import { Layer } from "react-map-gl/maplibre";
import type { SymbologyLayerProps } from "../Map.types";
import { parseConfig } from "../parse";

export function CircleLayer({
  layer,
  sourceLayer,
  context,
}: SymbologyLayerProps): React.ReactElement {
  const { slug } = layer;

  const { color, borderColor } = useMemo(() => {
    return parseConfig(layer, context);
  }, [layer, context]);

  return (
    <Layer
      filter={layer.renderOptions?.filter ?? true}
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
