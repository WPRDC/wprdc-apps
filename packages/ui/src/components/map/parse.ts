import type {
  InteractiveOption,
  InteractiveSymbologyProps,
  LayerConfig,
  MapState,
  QualitativeSymbologyProps,
  StyleOption,
  StyleValue,
  ZoomOption,
} from "@wprdc/types";
import { GeoType, SymbologyMode } from "@wprdc/types";
import type {
  DataDrivenPropertyValueSpecification,
  ExpressionSpecification,
  SourceFunctionSpecification,
} from "@maplibre/maplibre-gl-style-spec";
import {
  darken,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_COLOR,
  DEFAULT_FILL_OPACITY,
  DEFAULT_LINE_OPACITY,
  DEFAULT_LINE_WIDTH,
  getPrimaryHoveredID,
  getSelectedID,
} from "./util";
import type { ParseResults } from "./Map.types";

/**
 * Converts our layer configuration to maplibre expressions.
 *
 * @param layer   - WPRDC layer configuration to convert
 * @param context - The current state of the map using the layer.
 *                    Provides context on selected features, hover state and click state.
 */
export function parseConfig(
  layer: LayerConfig,
  context: MapState,
): ParseResults {
  let color: ParseResults["color"];
  let borderColor: ParseResults["borderColor"];
  let lineSortKey: ParseResults["lineSortKey"];
  // the process for generating color expressions varies between symbology modes
  switch (layer.symbologyMode) {
    case SymbologyMode.Qualitative:
      color = parseQualitativeColorExpression(layer);
      borderColor = parseQualitativeColorExpression(layer, darken(20));
      break;
    case SymbologyMode.Solid:
      color = parseOption(layer.color, layer, context, DEFAULT_COLOR);
      borderColor = parseOption(
        layer.borderColor,
        layer,
        context,
        darken(20)(DEFAULT_COLOR),
      );
      break;
    case SymbologyMode.Interactive:
      color = parseOption(layer.color, layer, context, DEFAULT_COLOR);
      borderColor = parseOption(
        layer.borderColor,
        layer,
        context,
        darken(20)(DEFAULT_COLOR),
      );

      lineSortKey = [
        "case",
        ["==", ["get", layer.idField], getSelectedID(layer, context) ?? ""],
        100,
        [
          "==",
          ["get", layer.idField],
          getPrimaryHoveredID(layer, context) ?? "",
        ],
        200,
        0,
      ];
      break;
  }

  const opacity = parseOption(
    layer.opacity,
    layer,
    context,
    DEFAULT_FILL_OPACITY,
  );
  const borderOpacity = parseOption(
    layer.borderOpacity,
    layer,
    context,
    DEFAULT_LINE_OPACITY,
  );
  const borderWidth = parseOption(
    layer.borderWidth,
    layer,
    context,
    layer.type === GeoType.Polygon ? DEFAULT_BORDER_WIDTH : DEFAULT_LINE_WIDTH,
  );

  return {
    color,
    borderColor,
    opacity,
    borderOpacity,
    borderWidth,
    lineSortKey,
  };
}

/**
 * Generates mapbox expression for colors of categorical layers.
 *
 * @param layer   - Qualitative layer configuration
 * @param styler  - Function to apply to all colors generated.
 *                    useful for generating pairings of colors, like having borders be same color but darker.
 */
export function parseQualitativeColorExpression(
  layer: LayerConfig<QualitativeSymbologyProps>,
  styler: (color: string) => string = (c) => c,
): SourceFunctionSpecification<string> {
  return {
    property: layer.colors.field,
    type: "categorical",
    stops: Object.entries(layer.colors.categories).map(([k, v]) => [
      k,
      styler(v.color),
    ]),
  };
}

/**
 * Generates mapbox expression for most configuration options.
 *
 * @param option        - The value of the configuration option being parsed
 * @param layer         - The layer object the option is from
 * @param context       - The current state of the map using the layer.
 *                          Provides context on selected features, hover state and click state.
 * @param defaultValue  - Value to use in default cases.
 */
export function parseOption<T extends StyleValue>(
  option: StyleOption<T>,
  layer: LayerConfig,
  context: MapState,
  defaultValue: DataDrivenPropertyValueSpecification<T>,
): DataDrivenPropertyValueSpecification<T> {
  // if undefined or null, return default
  if (!option && typeof option !== "number") return defaultValue;

  if (typeof option === "object") {
    // if option is in interactive form
    if ("default" in option) {
      return parseInteractiveOption<T>(
        option,
        layer as LayerConfig<InteractiveSymbologyProps>,
        context,
      );
    }
    // if option is in zoom form
    return parseZoomOption<T>(option, layer, context);
  }
  return option;
}

/**
 * Converts from WPRDC zoom config to maplibre zoom interpolation expression.
 *
 * @param option  - The value of the configuration option being parsed
 * @param layer   - The layer object the option is from
 * @param context - The current state of the map using the layer.
 *                    Provides context on selected features, hover state and click state.
 */
export function parseZoomOption<T extends StyleValue>(
  option: ZoomOption<T> | ZoomOption<InteractiveOption<T>>,
  layer: LayerConfig,
  context: MapState,
): ExpressionSpecification {
  const minZoom = layer.minZoom ?? 0.1;

  const parsedZoomOption: [number, T | ExpressionSpecification][] = option.map(
    ([zoom, value]) => [
      zoom,
      typeof value === "object"
        ? parseInteractiveOption(
            value,
            layer as LayerConfig<InteractiveSymbologyProps>,
            context,
          )
        : value,
    ],
  );

  const remainder = Array.prototype.concat(...parsedZoomOption) as (
    | StyleValue
    | ExpressionSpecification
  )[];

  return [
    "interpolate",
    ["exponential", 0.5],
    ["zoom"],
    0,
    0,
    // start from minzoom
    minZoom,
    0,
    ...remainder,
  ] as ExpressionSpecification;
}

/**
 * Converts from WPRDC interactive config to maplibre case expression.
 *
 * @param option  - The value of the configuration option being parsed
 * @param layer   - The layer object the option is from
 * @param context - The current state of the map using the layer.
 *                    Provides context on selected features, hover state and click state.
 */
export function parseInteractiveOption<T extends StyleValue>(
  option: InteractiveOption<T>,
  layer: LayerConfig<InteractiveSymbologyProps>,
  context: MapState,
): ExpressionSpecification | T {
  const { selectedIDs, hoveredFeatures } = context;
  const { idField } = layer;

  const hoveredFeature = hoveredFeatures ? hoveredFeatures[0] : null;

  const selectedIDsForLayer: string[] = selectedIDs?.[layer.slug]
    ? selectedIDs[layer.slug]
    : [];

  const hoveredID = hoveredFeature
    ? (hoveredFeature.properties[layer.idField] as string | undefined)
    : "";

  const result: ExpressionSpecification = [
    "case",
    ["in", ["get", idField], ["literal", selectedIDsForLayer]],
    option.selected,
    [
      "case",
      ["==", ["get", idField], hoveredID ?? ""],
      option.hovered,
      option.default,
    ],
  ];

  if (layer.ignoreCase) {
    return ["case", layer.ignoreCase, option.default, result];
  }

  return result;
}
