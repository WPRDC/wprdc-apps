import type {
  DataDrivenPropertyValueSpecification,
  ExpressionSpecification,
  SourceFunctionSpecification,
} from "@maplibre/maplibre-gl-style-spec";
import {
  GeoType,
  InteractiveExpression,
  type LayerConfig,
  type MapState,
  type ParseResults,
  type StyleValue,
  type SymbologyOptions,
  ZoomExpression,
} from "@wprdc/types";
import {
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
 * Converts wprdc layer configuration to maplibre expressions.
 *
 * @param layer   - WPRDC layer configuration to convert
 * @param context - The current state of the map using the layer.
 *                    Provides context on selected features, hover state and click state.
 */
export function parseConfig(
  layer: LayerConfig,
  context: MapState,
): ParseResults {
  // todo: check if categories are defined. if so, then
  //  - make sure any field using cateogories uses the same ones,
  //  - and that at least one field is style by category (otherwise how would users see them?)

  const color: DataDrivenPropertyValueSpecification<string> =
    parseOption<string>(
      "color",
      layer,
      context,
      DEFAULT_COLOR,
    ) as DataDrivenPropertyValueSpecification<string>;
  const borderColor: DataDrivenPropertyValueSpecification<string> =
    parseOption<string>(
      "borderColor",
      layer,
      context,
      "#000",
    ) as DataDrivenPropertyValueSpecification<string>;

  let lineSortKey: ExpressionSpecification | undefined = undefined;
  if (!!layer.interaction) {
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
  }

  // numeric values
  const opacity: DataDrivenPropertyValueSpecification<number> = parseOption(
    "opacity",
    layer,
    context,
    DEFAULT_FILL_OPACITY,
  ) as DataDrivenPropertyValueSpecification<number>;
  const borderOpacity = parseOption(
    "borderOpacity",
    layer,
    context,
    DEFAULT_LINE_OPACITY,
  ) as DataDrivenPropertyValueSpecification<number>;
  const borderWidth = parseOption(
    "borderWidth",
    layer,
    context,
    layer.type === GeoType.Polygon ? DEFAULT_BORDER_WIDTH : DEFAULT_LINE_WIDTH,
  ) as DataDrivenPropertyValueSpecification<number>;

  // todo: improve typing and avoid these "as" statements
  const textSize: ExpressionSpecification = parseOption(
    "textSize",
    layer,
    context,
    DEFAULT_TEXT_SIZE,
  ) as ExpressionSpecification;

  // label
  const textField: ExpressionSpecification = parseOption(
    "textField",
    layer,
    context,
    "",
  ) as ExpressionSpecification;

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

export function parseAsLegendProps(layer: LayerConfig): {
  color?: string;
  borderColor?: string;
  borderWidth?: number;
};
export function parseAsLegendProps(
  layer: LayerConfig,
  category: string | number,
): {
  color?: string;
  borderColor?: string;
  borderWidth?: number;
};
export function parseAsLegendProps(
  layer: LayerConfig,
  category?: string | number,
): {
  color?: string;
  borderColor?: string;
  borderWidth?: number;
} {

  const color = parseOptionAsLegendProp("color", layer, category);
  const borderColor = parseOptionAsLegendProp("borderColor", layer, category);
  const borderWidth = parseOptionAsLegendProp("borderWidth", layer, category);

  return { color, borderColor, borderWidth };
}

export function parseInteractiveExpressionForLegend(
  expression: string | number | InteractiveExpression<string | number>,
): string | number {
  if (typeof expression === "object") return expression.default;
  return expression;
}

// solid style
export function parseOptionAsLegendProp(
  option: "color" | "borderColor",
  layer: LayerConfig,
  category: undefined,
): string | undefined;
export function parseOptionAsLegendProp(
  option: "borderWidth",
  layer: LayerConfig,
  category: undefined,
): number | undefined;
// categorical
export function parseOptionAsLegendProp(
  option: "color" | "borderColor",
  layer: LayerConfig,
  category?: string | number,
): string | undefined;
export function parseOptionAsLegendProp(
  option: "borderWidth",
  layer: LayerConfig,
  category?: string | number,
): number | undefined;
export function parseOptionAsLegendProp(
  option: "color" | "borderColor" | "borderWidth",
  layer: LayerConfig,
  category: string | number = "",
): string | number | undefined {
  const record = layer.symbology[option];


  if (!record) return undefined;
  switch (record.mode) {
    case "fixed":
      return parseInteractiveExpressionForLegend(record.value);
    case "zoom":
      // gets value from a step near the middle
      const zoomStep = Math.floor(record.value.length / 2);
      return parseInteractiveExpressionForLegend(record.value[zoomStep][1]);
    case "category":
      switch (record.submode) {
        case "simple":
          const sValue = record.value[category];
          return parseInteractiveExpressionForLegend(
            sValue,
          );
        case "zoom":
          const zValue = record.value[category];
          // gets value from a step near the middle
          const zoomStep = Math.floor(zValue.length / 2);
          return parseInteractiveExpressionForLegend(zValue[zoomStep][1]);
      }
  }
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
  option: keyof Omit<SymbologyOptions, "mode" | "field" | "categories">,
  layer: LayerConfig,
  context: MapState,
  defaultValue: DataDrivenPropertyValueSpecification<T>,
):
  | DataDrivenPropertyValueSpecification<T>
  | DataDrivenPropertyValueSpecification<ExpressionSpecification>
  | ExpressionSpecification
  | T {
  // if undefined or null, return default
  if (!layer.symbology[option]) return defaultValue;

  const symbologyRecord = layer.symbology[option];

  switch (symbologyRecord.mode) {
    case "fixed":
      return parseInteractiveExpression<T>(
        symbologyRecord.value as T | InteractiveExpression<T>,
        layer,
        context,
      );

    case "zoom":
      return parseZoomExpression<T>(
        symbologyRecord.value as
          | ZoomExpression<T>
          | ZoomExpression<InteractiveExpression<T>>,
        layer,
        context,
      );

    case "category":
      if (
        symbologyRecord.submode === "zoom" &&
        layer.symbology.mode === "category"
      )
        return {
          property: layer.symbology.field,
          type: "categorical",
          stops: Object.entries(symbologyRecord.value).map(
            ([category, categoryExpression]) => [
              category,
              parseZoomExpression(categoryExpression, layer, context),
            ],
          ),
        };
      else if (
        symbologyRecord.submode === "simple" &&
        layer.symbology.mode === "category"
      ) {
        return {
          property: layer.symbology.field,
          type: "categorical",
          stops: Object.entries(symbologyRecord.value).map(
            ([category, categoryExpression]) => [
              category,
              parseInteractiveExpression(
                categoryExpression as T | InteractiveExpression<T>,
                layer,
                context,
              ),
            ],
          ),
        } as SourceFunctionSpecification<ExpressionSpecification>;
      }
      break;
    case "expression":
      return symbologyRecord.expression;
  }

  return defaultValue;
}

/**
 * Converts from WPRDC interactive config to maplibre case expression.
 *
 * @param expression  - The value of the configuration option being parsed
 * @param layer   - The layer object the option is from
 * @param context - The current state of the map using the layer.
 *                    Provides context on selected features, hover state and click state.
 */
export function parseInteractiveExpression<T extends StyleValue>(
  expression: T | InteractiveExpression<T>,
  layer: LayerConfig,
  context: MapState,
): ExpressionSpecification | T {
  // plain values are directly used
  if (typeof expression !== "object") {
    return expression;
  }

  const { selectedIDs, hoveredFeatures } = context;
  const { idField, ignoreCase } = layer.interaction ?? { idField: "" };

  if (!idField) {
    console.error(
      "Misconfigured layer.  Layers with interactive symbology expressions require top-level interaction specifications",
    );
  }

  const hoveredFeature = hoveredFeatures ? hoveredFeatures[0] : null;

  const selectedIDsForLayer: string[] = selectedIDs?.[layer.slug]
    ? selectedIDs[layer.slug]
    : [];

  const hoveredID = hoveredFeature
    ? (hoveredFeature.properties[idField] as string | undefined)
    : "";

  const result: ExpressionSpecification = [
    "case",
    ["in", ["get", idField], ["literal", selectedIDsForLayer]],
    expression.selected,
    [
      "case",
      ["==", ["get", idField], hoveredID ?? ""],
      expression.hovered,
      expression.default,
    ],
  ];

  if (ignoreCase) {
    return ["case", ignoreCase, expression.default, result];
  }

  return result;
}

/**
 * Converts from WPRDC zoom config to maplibre zoom interpolation expression.
 *
 * @param expression  - The value of the configuration option being parsed
 * @param layer   - The layer object the option is from
 * @param context - The current state of the map using the layer.
 *                    Provides context on selected features, hover state and click state.
 */
export function parseZoomExpression<T extends StyleValue>(
  expression: ZoomExpression<T> | ZoomExpression<InteractiveExpression<T>>,
  layer: LayerConfig,
  context: MapState,
): ExpressionSpecification {
  const parsedZoomOption = expression.map(([zoom, value]) => [
    zoom,
    typeof value === "object"
      ? parseInteractiveExpression(value, layer as LayerConfig, context)
      : value,
  ]);

  const remainder = Array.prototype.concat(...parsedZoomOption) as (
    | StyleValue
    | ExpressionSpecification
  )[];

  // ignore minzoom default if style goes below it
  const minZoom = layer.tileSource.minZoom ?? 0.1;
  let minZoomArgs: [number, number] | never[] = [minZoom, 0];
  if (minZoom >= expression[0][0]) {
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
