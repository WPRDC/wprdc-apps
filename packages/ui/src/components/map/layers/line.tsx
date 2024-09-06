import { Layer } from "react-map-gl/maplibre";
import { useMemo } from "react";
import type { SymbologyLayerProps } from "../Map.types";
import { parseConfig } from "../parse";

export function LineLayer({
  layer,
  sourceLayer,
  context,
}: SymbologyLayerProps): React.ReactElement {
  const { slug } = layer;

  const { color, borderWidth } = useMemo(() => {
    return parseConfig(layer, context);
  }, [layer, context]);

  return (
    <Layer
      filter={layer.renderOptions?.filter ?? true}
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
