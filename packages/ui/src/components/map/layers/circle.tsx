import { useMemo } from "react";
import { Layer } from "react-map-gl/maplibre";
import type { SymbologyLayerProps } from "../Map.types";
import { parseSymbology } from "../parse";
import { FilterSpecification } from "@maplibre/maplibre-gl-style-spec";
import {
  CircleLayoutSpec,
  CirclePaintSpec, CircleSymbologyConfig,
  LayerConfig,
  SimplifiedSymbologyConfig,
} from "@wprdc/types";
import { RawCircleSymbologyConfig } from "@wprdc/types";

export function CircleLayer({
  layer,
  sourceLayer,
  context,
}: SymbologyLayerProps<CircleSymbologyConfig>): React.ReactElement {
  const { slug } = layer;
  const filter: FilterSpecification | undefined = layer.renderOptions?.filter;

  if (layer.symbology.mode === "raw") {
    const symbology = layer.symbology as RawCircleSymbologyConfig
    return (
      <Layer
        id={`${slug}-circle`}
        source={slug}
        source-layer={sourceLayer}
        type="circle"
        filter={filter}
        paint={symbology.paint as CirclePaintSpec}
        layout={symbology.layout as CircleLayoutSpec}
      />
    );
  }

  const { fillColor, strokeColor } = useMemo(() => {
    return parseSymbology(
      layer as LayerConfig<SimplifiedSymbologyConfig>,
      context,
    );
  }, [layer, context]);

  return (
    <Layer
      id={`${slug}-circle`}
      source={slug}
      source-layer={sourceLayer}
      type="circle"
      filter={filter}
      layout={{}}
      paint={{
        "circle-color": fillColor,
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 3, 9, 8],
        "circle-stroke-color": strokeColor,
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

    />
  );
}
