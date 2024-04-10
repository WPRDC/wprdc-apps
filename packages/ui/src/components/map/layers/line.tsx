import { Layer } from "react-map-gl/maplibre";
import type { SymbologyLayerProps } from "../Map.types";
import { parseConfig } from "../parse";

export function LineLayer({
  layer,
  sourceLayer,
  context,
}: SymbologyLayerProps): React.ReactElement {
  const { slug } = layer;

  const { color, borderWidth } = parseConfig(layer, context);

  return (
    <Layer
      filter={layer.filter ?? true}
      id={`${slug}-line`}
      layout={{}}
      paint={{
        "line-color": color,
        "line-width": borderWidth,
      }}
      source={slug}
      source-layer={sourceLayer}
      type="line"
    />
  );
}
