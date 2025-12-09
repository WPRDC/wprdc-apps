import { useMemo } from "react";
import { Layer } from "react-map-gl/maplibre";
import type { SymbologyLayerProps } from "../Map.types";
import { parseSymbology } from "../parse";
import { FilterSpecification } from "@maplibre/maplibre-gl-style-spec";
import {
  LayerConfig,
  LineLayoutSpec,
  LinePaintSpec,
  LineSymbologyConfig,
  SimplifiedSymbologyConfig,
} from "@wprdc/types";

export function LineLayer({
  layer,
  sourceLayer,
  context,
}: SymbologyLayerProps<LineSymbologyConfig>): React.ReactElement {
  const { slug } = layer;
  const filter: FilterSpecification | undefined = layer.renderOptions?.filter;

  if (layer.symbology.mode === "raw")
    return (
      <Layer
        id={`${slug}-line`}
        source={slug}
        source-layer={sourceLayer}
        type="line"
        filter={filter}
        layout={layer.symbology.layout as LineLayoutSpec}
        paint={layer.symbology.paint as LinePaintSpec}
      />
    );

  const { strokeColor, strokeWidth } = useMemo(() => {
    return parseSymbology(
      layer as LayerConfig<SimplifiedSymbologyConfig>,
      context,
    );
  }, [layer, context]);

  return (
    <Layer
      id={`${slug}-line`}
      source={slug}
      source-layer={sourceLayer}
      type="line"
      filter={filter}
      layout={{}}
      paint={{
        "line-color": strokeColor,
        "line-width": strokeWidth,
      }}
    />
  );
}
