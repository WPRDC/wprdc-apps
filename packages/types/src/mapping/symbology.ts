import {
  ColorSpecification,
  DataDrivenPropertyValueSpecification,
  ExpressionInputType,
  ExpressionSpecification,
  InterpolationSpecification,
  ProjectionDefinitionSpecification,
} from "@maplibre/maplibre-gl-style-spec";
import type {
  CircleLayerSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
} from "maplibre-gl";
import { GeoType } from "../shared.ts";

export type CirclePaintSpec = NonNullable<CircleLayerSpecification["paint"]>;
export type CircleLayoutSpec = NonNullable<CircleLayerSpecification["layout"]>;
export type FillPaintSpec = NonNullable<FillLayerSpecification["paint"]>;
export type FillLayoutSpec = NonNullable<FillLayerSpecification["layout"]>;
export type LinePaintSpec = NonNullable<LineLayerSpecification["paint"]>;
export type LineLayoutSpec = NonNullable<LineLayerSpecification["layout"]>;

export interface ParseResults {
  fillColor: DataDrivenPropertyValueSpecification<string>;
  fillOpacity: DataDrivenPropertyValueSpecification<number>;
  strokeColor: DataDrivenPropertyValueSpecification<string>;
  strokeOpacity: DataDrivenPropertyValueSpecification<number>;
  strokeWidth: DataDrivenPropertyValueSpecification<number>;
  lineSortKey?: ExpressionSpecification;
  textField?: ExpressionSpecification;
  textSize?: ExpressionSpecification;
}

export type MatchRecords = [
  ExpressionInputType | ExpressionInputType[],
  ExpressionInputType | ExpressionSpecification,
  ...(ExpressionInputType | ExpressionInputType[] | ExpressionSpecification)[],
];

export type MatchExpression = [
  "match",
  ExpressionInputType | ExpressionSpecification,
  ExpressionInputType | ExpressionInputType[],
  ExpressionInputType | ExpressionSpecification,
  ...(ExpressionInputType | ExpressionInputType[] | ExpressionSpecification)[],
  (
    // repeated as above
    ExpressionInputType | ExpressionSpecification
  ),
];

export type CaseRecords = [
  boolean | ExpressionSpecification,
  ExpressionInputType | ExpressionSpecification,
  ...(boolean | ExpressionInputType | ExpressionSpecification)[],
];

export type CaseExpression = [
  "case",
  boolean | ExpressionSpecification,
  ExpressionInputType | ExpressionSpecification,
  ...(boolean | ExpressionInputType | ExpressionSpecification)[],
  ExpressionInputType | ExpressionSpecification,
];

export type InterpolationExpressionRecord = [
  ...(
    | number
    | number[]
    | ColorSpecification
    | ExpressionSpecification
    | ProjectionDefinitionSpecification
  )[],
];

export type InterpolationExpression = [
  "interpolate",
  InterpolationSpecification,
  number | ExpressionSpecification,
  ...InterpolationExpressionRecord,
];

export type ZoomInterpolation = [
  "interpolate",
  InterpolationSpecification,
  number | ExpressionSpecification,
  ...InterpolationExpressionRecord,
];

export type StepExpressionRecord = [
  ...(number | ExpressionInputType | ExpressionSpecification)[],
];

export type StepExpression = [
  "step",
  number | ExpressionSpecification,
  ExpressionInputType | ExpressionSpecification,
  ...(number | ExpressionInputType | ExpressionSpecification)[],
];

export type StyleValue = string | number;

export type ZoomExpression<
  T extends StyleValue | InteractiveExpression<StyleValue>,
> = [
  number, // zoom level
  T,
][];

export interface InteractiveExpression<T extends StyleValue> {
  default: T;
  selected: T;
  hovered: T;
}

export type OptionallySimpleInteractive<T extends StyleValue = StyleValue> =
  | T
  | InteractiveExpression<T>;

export type OptionallyZoomInteractive<T extends StyleValue = StyleValue> =
  | ZoomExpression<T>
  | ZoomExpression<InteractiveExpression<T>>;

export type OptionallyInteractive<T extends StyleValue = StyleValue> =
  | OptionallySimpleInteractive<T>
  | OptionallyZoomInteractive<T>;
// Symbology Options

/** Configuration used for fixed/static data layers */
export interface FixedSymbologyOptions<T extends StyleValue = StyleValue> {
  mode: "fixed";

  style: OptionallyInteractive<T>;
}

export interface CategorySymbologyRecord<T extends StyleValue = StyleValue> {
  /** Unique ID for category */
  slug: string;
  /** The label for this category */
  label: string;
  /** The value found in `field` that signifies this category */
  value: string | number;
  /** The style used for this category */
  style: OptionallyInteractive<T>;
}

/** Configuration used for categorical data layers */
export interface CategorySymbologyOptions<T extends StyleValue = StyleValue> {
  mode: "category";

  /** Field from which categories are derived */
  field: string;
  /** Maps categories to value */
  style: [CategorySymbologyRecord<T>, ...CategorySymbologyRecord<T>[]];

  /** Style used when no category is matched */
  defaultStyle?: OptionallyInteractive<T>;
}

export type DecisionOperator = "==" | "!=" | ">" | "<" | "<=" | ">=";
export interface CaseSymbologyRecord<T extends StyleValue = StyleValue> {
  /** Unique ID for case */
  slug: string;
  /** Optional label, otherwise generated from operator and value */
  label?: string;
  /** The operator comparing the field's value against `operand` */
  operator: DecisionOperator;
  /** The value to compare the field's value against */
  operand: number;
  /** The style used in this case */
  style: OptionallyInteractive<T>;
}

/** Configuration used for conditionally-styled data layers */
export interface CaseSymbologyOptions<T extends StyleValue = StyleValue> {
  mode: "case";

  /** Field from which categories are derived */
  field: string;

  /** Cases and their associated style values */
  style: [CaseSymbologyRecord<T>, ...CaseSymbologyRecord<T>[]];

  /** Style used when no category is matched */
  defaultStyle?: OptionallyInteractive<T>;
}

export type RampType =
  | "step"
  | "linear"
  | "square"
  | "square-root"
  | "ease-in"
  | "ease-out"
  | "ease-in-out";

export interface RampSymbologyRecord<T extends StyleValue = StyleValue> {
  /** The label placed at this point in the ramp.  Usually used for first and last steps */
  label?: string;
  /** The value compared against `field` that defines this point in the ramp */
  value: number;
  /** The style used at this point in the ramp */
  style: OptionallyInteractive<T>;
}

/** Configuration used for value controlled on interpolation on data (e.g. choropleth) */
export interface RampSymbologyOptions<T extends StyleValue = StyleValue> {
  mode: "ramp";

  /** Field from which values are interpolated for the ramp */
  field: string;

  /** The type of interpolation used.  Step uses discrete steps */
  type: RampType;

  /** Ramp points and their associated style values */
  style: [
    RampSymbologyRecord<T>,
    ...RampSymbologyRecord<T>[],
    RampSymbologyRecord<T>,
  ];

  /**
   * Style used when no category is matched.
   * For `step` ramps this is less  used before the first step
   a*/
  defaultStyle?: OptionallyInteractive<T>;
}

interface ExpressionSpecificationSymbologyOption {
  mode: "expression";
  expression: ExpressionSpecification;
}

export type SymbologyOptions<T extends StyleValue = StyleValue> =
  | FixedSymbologyOptions<T>
  | CategorySymbologyOptions<T>
  | CaseSymbologyOptions<T>
  | RampSymbologyOptions<T>
  | ExpressionSpecificationSymbologyOption;

export type LegendSymbologyField =
  | "fillColor"
  | "strokeColor"
  | "fillOpacity"
  | "strokeWidth"
  | "strokeOpacity";

/** Simplified configuration should cover most cases */
export interface SimplifiedSymbologyConfig {
  mode: "simplified";
  /** The type of geometry being styled */
  /** The type of geometry being styled */
  geoType: GeoType;

  // Discrete Fields
  /** Color specification to apply to all features in layer */
  fillColor?: SymbologyOptions<string>;
  /** Color specification to apply to strokes of all features */
  strokeColor?: SymbologyOptions<string>;

  // Continuous Fields
  /** Override opacity settings */
  fillOpacity?: SymbologyOptions<number>;
  /** Override border width */
  strokeWidth?: SymbologyOptions<number>;
  /** Override border opacity */
  strokeOpacity?: SymbologyOptions<number>;

  // Text fields
  /** Expression that returns a string to use as a label */
  textField?: ExpressionSpecificationSymbologyOption;
  /** Expression that returns a string to use as a subtitle to `textField` */
  subtitleTextField?: ExpressionSpecificationSymbologyOption;
  /** Override font size for labels if they are present */
  textSize?: SymbologyOptions<number>;
}

// Allow for manually defining a layer's symbology in rare cases.
export interface RawCircleSymbologyConfig {
  mode: "raw";
  geoType: GeoType.Point;
  paint?: CirclePaintSpec;
  layout?: CircleLayoutSpec;
}
export interface RawLineSymbologyConfig {
  mode: "raw";
  geoType: GeoType.Line;
  paint?: LinePaintSpec;
  layout?: LineLayoutSpec;
}
export interface RawPolygonSymbologyConfig {
  mode: "raw";
  geoType: GeoType.Polygon;
  fillPaint?: FillPaintSpec;
  fillLayout?: FillLayoutSpec;
  linePaint?: LinePaintSpec;
  lineLayout?: LineLayoutSpec;
}

/** Manually provided symbology configuration using maplibre style specification */
export type RawSymbologyConfig =
  | RawCircleSymbologyConfig
  | RawLineSymbologyConfig
  | RawPolygonSymbologyConfig;

export type CircleSymbologyConfig =
  | SimplifiedSymbologyConfig
  | RawCircleSymbologyConfig;
export type LineSymbologyConfig =
  | SimplifiedSymbologyConfig
  | RawLineSymbologyConfig;
export type PolygonSymbologyConfig =
  | SimplifiedSymbologyConfig
  | RawPolygonSymbologyConfig;

export type SymbologyConfig =
  | CircleSymbologyConfig
  | LineSymbologyConfig
  | PolygonSymbologyConfig;
