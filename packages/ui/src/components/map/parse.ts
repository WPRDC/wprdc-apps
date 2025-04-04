import type {
  DataDrivenPropertyValueSpecification,
  ExpressionSpecification,
  SourceFunctionSpecification,
} from "@maplibre/maplibre-gl-style-spec";
import {
  GeoType,
  SymbologyMode,
  type InteractiveOption,
  type InteractiveSymbologyProps,
  type LayerConfig,
  type MapState,
  type QualitativeSymbologyProps,
  type StyleOption,
  type StyleValue,
  type ZoomOption,
} from "@wprdc/types";
import type { ParseResults } from "./Map.types";
import {
  darken,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_COLOR,
  DEFAULT_FILL_OPACITY,
  DEFAULT_LINE_OPACITY,
  DEFAULT_LINE_WIDTH,
  DEFAULT_TEXT_SIZE,
  getPrimaryHoveredID,
  getSelectedID,
} from "./util";

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
      color = parseOption(layer.symbology.color, layer, context, DEFAULT_COLOR);
      borderColor = parseOption(
        layer.symbology.borderColor,
        layer,
        context,
        darken(20)(DEFAULT_COLOR),
      );
      break;
    case SymbologyMode.Interactive:
      color = parseOption(layer.symbology.color, layer, context, DEFAULT_COLOR);
      borderColor = parseOption(
        layer.symbology.borderColor,
        layer,
        context,
        darken(20)(DEFAULT_COLOR),
      );
      lineSortKey = [
        "case",
        [
          "==",
          ["get", layer.interaction.idField],
          getSelectedID(layer, context) ?? "",
        ],
        100,
        [
          "==",
          ["get", layer.interaction.idField],
          getPrimaryHoveredID(layer, context) ?? "",
        ],
        200,
        0,
      ];
      break;
  }

  // numeric values
  const opacity = parseOption(
    layer.symbology.opacity,
    layer,
    context,
    DEFAULT_FILL_OPACITY,
  );
  const borderOpacity = parseOption(
    layer.symbology.borderOpacity,
    layer,
    context,
    DEFAULT_LINE_OPACITY,
  );
  const borderWidth = parseOption(
    layer.symbology.borderWidth,
    layer,
    context,
    layer.type === GeoType.Polygon ? DEFAULT_BORDER_WIDTH : DEFAULT_LINE_WIDTH,
  );

  const textSize = parseOption(
    layer.symbology.textSize,
    layer,
    context,
    DEFAULT_TEXT_SIZE,
  );

  // label
  const textField: ExpressionSpecification | undefined =
    layer.symbology.textField;

  return {
    color,
    borderColor,
    opacity,
    borderOpacity,
    borderWidth,
    lineSortKey,
    textField,
    textSize,
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
    property: layer.symbology.colors.field,
    type: "categorical",
    stops: Object.entries(layer.symbology.colors.categories).map(([k, v]) => [
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
  if (!option) return defaultValue;

  // if option is in zoom form
  if (Array.isArray(option)) {
    return parseZoomOption<T>(option, layer, context);
  }

  // if option is in interactive form
  if (typeof option === "object") {
    if ("default" in option) {
      return parseInteractiveOption<T>(
        option,
        layer as LayerConfig<InteractiveSymbologyProps>,
        context,
      );
    }
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
  const parsedZoomOption = option.map(([zoom, value]) => [
    zoom,
    typeof value === "object"
      ? parseInteractiveOption(
          value,
          layer as LayerConfig<InteractiveSymbologyProps>,
          context,
        )
      : value,
  ]);

  const remainder = Array.prototype.concat(...parsedZoomOption) as (
    | StyleValue
    | ExpressionSpecification
  )[];

  // ignore minzoom default if style goes below it
  const minZoom = layer.tileSource.minZoom ?? 0.1;
  let minZoomArgs: [number, number] | never[] = [minZoom, 0];
  if (minZoom >= option[0][0]) {
    minZoomArgs = [];
  }

  return [
    "interpolate",
    ["exponential", 0.5],
    ["zoom"],
    0,
    0,
    // start from minzoom
    ...minZoomArgs,
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
  const { idField } = layer.interaction;

  const hoveredFeature = hoveredFeatures ? hoveredFeatures[0] : null;

  const selectedIDsForLayer: string[] = selectedIDs?.[layer.slug]
    ? selectedIDs[layer.slug]
    : [];

  const hoveredID = hoveredFeature
    ? (hoveredFeature.properties[layer.interaction.idField] as
        | string
        | undefined)
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

  if (layer.interaction.ignoreCase) {
    return ["case", layer.interaction.ignoreCase, option.default, result];
  }

  return result;
}
