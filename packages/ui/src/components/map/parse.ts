import {
  DataDrivenPropertyValueSpecification,
  ExpressionSpecification,
  InterpolationSpecification,
} from "@maplibre/maplibre-gl-style-spec";
import type {
  CaseExpression,
  CaseRecords,
  CategorySymbologyOptions,
  FixedSymbologyOptions,
  InteractiveExpression,
  InterpolationExpression,
  LabeledLegendStyleRecord,
  LayerConfig,
  LegendItemOptions,
  LegendOptions,
  LegendSymbologyField,
  MapState,
  MatchExpression,
  MatchRecords,
  OptionallyInteractive,
  OptionallySimpleInteractive,
  OptionallyZoomInteractive,
  ParseResults,
  RampLegendStyleRecord,
  RampLegendStyleRecords,
  RampSymbologyOptions,
  RampType,
  SimplifiedSymbologyConfig,
  StepExpression,
  StepExpressionRecord,
  StyleValue,
  ZoomExpression,
  ZoomInterpolation,
} from "@wprdc/types";
import { GeoType } from "@wprdc/types";
import {
  DEFAULT_COLOR,
  DEFAULT_FILL_OPACITY,
  DEFAULT_LINE_OPACITY,
  DEFAULT_LINE_WIDTH,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_TEXT_SIZE,
  getPrimaryHoveredID,
  getSelectedID,
} from "./util";

/**
 *
 * Converts wprdc layer configuration to maplibre expressions.
 *
 * @param layer   - WPRDC layer configuration to convert
 * @param context - The current state of the map using the layer.
 *                    Provides context on selected features, hover state and click state.
 */
export function parseSymbology(
  layer: LayerConfig<SimplifiedSymbologyConfig>,
  context: MapState,
): ParseResults {
  // colors
  const fillColor: DataDrivenPropertyValueSpecification<string> =
    parseOption<string>(
      "fillColor",
      layer,
      context,
      DEFAULT_COLOR,
    ) as DataDrivenPropertyValueSpecification<string>;
  const strokeColor: DataDrivenPropertyValueSpecification<string> =
    parseOption<string>(
      "strokeColor",
      layer,
      context,
      "#000",
    ) as DataDrivenPropertyValueSpecification<string>;

  // numeric values
  const fillOpacity: DataDrivenPropertyValueSpecification<number> = parseOption(
    "fillOpacity",
    layer,
    context,
    DEFAULT_FILL_OPACITY,
  ) as DataDrivenPropertyValueSpecification<number>;
  const strokeOpacity = parseOption(
    "strokeOpacity",
    layer,
    context,
    DEFAULT_LINE_OPACITY,
  ) as DataDrivenPropertyValueSpecification<number>;
  const strokeWidth = parseOption(
    "strokeWidth",
    layer,
    context,
    layer.symbology.geoType === GeoType.Polygon
      ? DEFAULT_STROKE_WIDTH
      : DEFAULT_LINE_WIDTH,
  ) as DataDrivenPropertyValueSpecification<number>;

  // make sure interactive features are above others
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
    fillColor,
    strokeColor,
    fillOpacity,
    strokeOpacity,
    strokeWidth,
    lineSortKey,
    textField,
    textSize,
  };
}

/**
 * Generates mapbox expression for symbology configuration options.
 *
 * @param field        - The value of the configuration option being parsed
 * @param layer         - The layer object the option is from
 * @param context       - The current state of the map using the layer.
 *                          Provides context on selected features, hover state and click state.
 * @param defaultValue  - Value to use in default cases.
 */
export function parseOption<T extends StyleValue>(
  field: keyof Omit<SimplifiedSymbologyConfig, "mode" | "geoType">,
  layer: LayerConfig<SimplifiedSymbologyConfig>,
  context: MapState,
  defaultValue: OptionallyInteractive<T>,
):
  | DataDrivenPropertyValueSpecification<T>
  | DataDrivenPropertyValueSpecification<ExpressionSpecification>
  | ExpressionSpecification
  | T {
  // if undefined or null, return default
  if (!layer.symbology[field])
    return parseSymbologyOption(defaultValue, layer, context);

  const symbologyRecord = layer.symbology[field];

  // generate maplibre paint expression depending on the style mode,
  switch (symbologyRecord.mode) {
    case "fixed":
      return parseSymbologyOption<T>(
        symbologyRecord.style as OptionallyInteractive<T>,
        layer,
        context,
      );

    case "category":
      const categoryRecords = symbologyRecord.style;
      let categoryExpressionRecords: MatchRecords = [
        categoryRecords[0].value,
        parseSymbologyOption(categoryRecords[0].style, layer, context),
      ];
      for (let i = 1; i < categoryRecords.length; i++) {
        categoryExpressionRecords.push(categoryRecords[i].value);
        categoryExpressionRecords.push(
          parseSymbologyOption(categoryRecords[i].style, layer, context),
        );
      }

      return [
        "match",
        ["get", symbologyRecord.field],
        ...categoryExpressionRecords,
        parseSymbologyOption(
          symbologyRecord.defaultStyle ?? defaultValue,
          layer,
          context,
        ),
      ] as MatchExpression;

    case "case":
      const caseRecords = symbologyRecord.style;
      let caseExpressionRecords: CaseRecords = [
        [
          caseRecords[0].operator,
          ["get", symbologyRecord.field],
          caseRecords[0].operand,
        ],
        parseSymbologyOption(caseRecords[0].style, layer, context),
      ];
      for (let i = 1; i < caseRecords.length; i++) {
        caseExpressionRecords.push([
          caseRecords[i].operator,
          ["get", symbologyRecord.field],
          caseRecords[i].operand,
        ]);
        caseExpressionRecords.push(
          parseSymbologyOption(caseRecords[i].style, layer, context),
        );
      }

      return [
        "case",
        ...caseExpressionRecords,
        parseSymbologyOption(
          symbologyRecord.defaultStyle ?? defaultValue,
          layer,
          context,
        ),
      ] as CaseExpression;

    case "ramp":
      const rampRecords = symbologyRecord.style;

      if (symbologyRecord.type === "step") {
        return [
          "step",
          ["get", symbologyRecord.field],
          parseSymbologyOption(
            symbologyRecord.defaultStyle ?? defaultValue,
            layer,
            context,
          ),
          ...rampRecords.reduce<StepExpressionRecord>(
            (acc, { value, style }) => [
              ...acc,
              value,
              parseSymbologyOption(style, layer, context),
            ],
            [],
          ),
        ] as StepExpression;
      }

      return [
        "interpolate",
        rampTypeToInterpolationSpec(symbologyRecord.type),
        ["get", symbologyRecord.field],
        1,
        "#000",
      ] as InterpolationExpression;

    case "expression":
      return symbologyRecord.expression;
  }

  return parseSymbologyOption(defaultValue, layer, context);
}

// in order of importance
const SYMBOLOGY_OPTIONS: LegendSymbologyField[] = [
  "fillColor",
  "strokeColor",
  "fillOpacity",
  "strokeWidth",
  "strokeOpacity",
];

export function legendFromOption(
  layer: LayerConfig<SimplifiedSymbologyConfig>,
  zoom: number = 0,
): LegendOptions | null {
  if (layer.legend) return layer.legend;

  const modes = SYMBOLOGY_OPTIONS.map((opt) => layer.symbology[opt]?.mode);

  const slug = layer.slug;
  const title = layer.title;
  const geoType = layer.symbology.geoType;

  const fixedFields = SYMBOLOGY_OPTIONS.filter(
    (opt) => layer.symbology[opt]?.mode === "fixed",
  );

  const categoryFields: LegendSymbologyField[] = SYMBOLOGY_OPTIONS.filter(
    (opt) =>
      layer.symbology[opt]?.mode === "category" ||
      layer.symbology[opt]?.mode === "case",
  );

  const rampField = SYMBOLOGY_OPTIONS.find(
    (opt) => layer.symbology[opt]?.mode === "ramp",
  );

  // at least one category/case but no ramps
  if (categoryFields.length && !rampField) {
    // primary category legend items
    const primaryLegendItems = getCategoryLegendItems(
      categoryFields[0],
      layer.symbology,
      zoom,
    );
    // optional secondary category legend items
    let secondaryLegendItems: LabeledLegendStyleRecord[] | undefined =
      undefined;
    if (categoryFields.length > 1)
      secondaryLegendItems = getCategoryLegendItems(
        categoryFields[1],
        layer.symbology,
        zoom,
      );

    return {
      slug,
      title,
      geoType,
      type: "category",
      baseStyle: generateBaseStyle(layer.symbology, fixedFields, zoom),
      styles: primaryLegendItems,
      secondaryStyles: secondaryLegendItems,
    };
  }

  // a ramp
  if (!!rampField) {
    return {
      slug,
      title,
      geoType,
      type: "ramp",
      baseStyle: generateBaseStyle(layer.symbology, fixedFields, zoom),
      styles: getRampLegendItems(rampField, layer.symbology, zoom),
      rampType: (layer.symbology[rampField] as RampSymbologyOptions).type,
    };
  }

  return {
    slug,
    title,
    geoType,
    type: "fixed",
    style: generateBaseStyle(layer.symbology, fixedFields, zoom),
    label: layer.title,
  };
}

function getRampLegendItems(
  field: LegendSymbologyField,
  symbology: SimplifiedSymbologyConfig,
  zoom: number,
): RampLegendStyleRecords {
  const rampOptions: RampSymbologyOptions = symbology[
    field
  ] as RampSymbologyOptions;

  const rampStyleRecords = rampOptions.style;

  let middleRecords: RampLegendStyleRecord[] = [];
  if (rampStyleRecords.length > 2) {
    for (let i = 1; i < rampStyleRecords.length - 1; i++) {
      middleRecords.push({
        label:
          rampStyleRecords[i].label ?? rampStyleRecords[i].value.toString(),
        style: mapStyleToLegendStyle(field, rampStyleRecords[i].style, zoom),
        slug: `step-${i}`,
      });
    }
  }
  return [
    {
      label: rampStyleRecords[0].label ?? rampStyleRecords[0].value.toString(),
      style: mapStyleToLegendStyle(field, rampStyleRecords[0].style, zoom),
      slug: "start",
    },
    ...middleRecords,
    {
      label:
        rampStyleRecords[rampStyleRecords.length - 1].label ??
        rampStyleRecords[rampStyleRecords.length - 1].value.toString(),
      style: mapStyleToLegendStyle(
        field,
        rampStyleRecords[rampStyleRecords.length - 1].style,
        zoom,
      ),
      slug: "end",
    },
  ];
}

function getCategoryLegendItems(
  field: LegendSymbologyField,
  symbology: SimplifiedSymbologyConfig,
  zoom: number,
): LabeledLegendStyleRecord[] {
  const categoryOptions: CategorySymbologyOptions = symbology[
    field
  ] as CategorySymbologyOptions;
  return categoryOptions.style.map((record, i) => ({
    label: record.label,
    style: mapStyleToLegendStyle(field, record.style, zoom),
    slug: record.slug,
  }));
}

function mapStyleToLegendStyle(
  field: keyof LegendItemOptions,
  style: OptionallyInteractive,
  zoom: number,
): LegendItemOptions {
  let styleAtZoom: OptionallySimpleInteractive;
  // if a zoom style, pick the style at this zoom, or first style if zoom is too low
  if (Array.isArray(style)) {
    styleAtZoom = style[0][1];
    for (let i = 0; i++; i < style.length) {
      const styleZoom = style[i][0];
      if (styleZoom < zoom) styleAtZoom = style[i][1];
    }
    if (typeof styleAtZoom === "object")
      return { [field]: styleAtZoom.default };
    else return { [field]: styleAtZoom };
  }
  // if non-zoom interactive definiton, just use default
  else if (typeof style === "object") {
    return { [field]: style.default };
  } else return { [field]: style };
}

function generateBaseStyle(
  symbology: SimplifiedSymbologyConfig,
  fields: LegendSymbologyField[],
  zoom: number,
): LegendItemOptions {
  return fields.reduce<LegendItemOptions>((acc, curr) => {
    const record = symbology[curr] as FixedSymbologyOptions;
    return {
      ...acc,
      [curr]: symbology[curr]
        ? mapStyleToLegendStyle(curr, record.style, zoom)
        : DEFAULT_COLOR,
    };
  }, {});
}
export function rampTypeToInterpolationSpec(
  rampType: RampType,
): InterpolationSpecification {
  switch (rampType) {
    case "square":
      return ["exponential", 2];
    case "square-root":
      return ["exponential", 0.5];
    case "ease-in":
      return ["cubic-bezier", 0.42, 0, 1, 1];
    case "ease-out":
      return ["cubic-bezier", 0, 0, 0.58, 1];
    case "ease-in-out":
      return ["cubic-bezier", 0.42, 0, 0.58, 1];
    case "linear":
    default:
      return ["linear"];
  }
}

export function parseInteractiveExpressionForLegend(
  expression: string | number | InteractiveExpression<string | number>,
): string | number {
  if (typeof expression === "object") return expression.default;
  return expression;
}

/**
 * Converts from any WPRDC symbology option to a maplibre expression
 *
 * @param expression  - The value of the configuration option being parsed
 * @param layer   - The layer object the option is from
 * @param context - The current state of the map using the layer.
 *                    Provides context on selected features, hover state and click state.
 */
export function parseSymbologyOption<T extends StyleValue>(
  expression: OptionallySimpleInteractive<T> | OptionallyZoomInteractive<T>,
  layer: LayerConfig<SimplifiedSymbologyConfig>,
  context: MapState,
) {
  if (Array.isArray(expression)) {
    return parseZoomSymbologyOption(expression, layer, context);
  }
  return parseSingleSymbologyOption(expression, layer, context);
}

/**
 * Converts from WPRDC symbology option to maplibre case expression.
 *
 * @param expression  - The value of the configuration option being parsed
 * @param layer   - The layer object the option is from
 * @param context - The current state of the map using the layer.
 *                    Provides context on selected features, hover state and click state.
 */
function parseSingleSymbologyOption<T extends StyleValue>(
  expression: T | InteractiveExpression<T>,
  layer: LayerConfig<SimplifiedSymbologyConfig>,
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
 * Converts from WPRDC zoom-controlled symbology option to maplibre zoom interpolation expression.
 *
 * @param expression  - The value of the configuration option being parsed
 * @param layer   - The layer object the option is from
 * @param context - The current state of the map using the layer.
 *                    Provides context on selected features, hover state and click state.
 */
export function parseZoomSymbologyOption<T extends StyleValue>(
  expression: ZoomExpression<T> | ZoomExpression<InteractiveExpression<T>>,
  layer: LayerConfig<SimplifiedSymbologyConfig>,
  context: MapState,
): ZoomInterpolation {
  const parsedZoomOption = expression.map(([zoom, value]) => [
    zoom,
    typeof value === "object"
      ? parseSingleSymbologyOption(value, layer, context)
      : value,
  ]);

  const remainder = Array.prototype.concat(...parsedZoomOption) as (
    | StyleValue
    | ExpressionSpecification
  )[];

  // ignore minzoom default if style goes below it
  const minZoom = layer.tiles.minZoom ?? 0.1;
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
  ];
}
