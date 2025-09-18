import {
  DataDrivenPropertyValueSpecification,
  ExpressionSpecification,
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
  color: DataDrivenPropertyValueSpecification<string>;
  opacity: DataDrivenPropertyValueSpecification<number>;
  borderColor: DataDrivenPropertyValueSpecification<string>;
  borderOpacity: DataDrivenPropertyValueSpecification<number>;
  borderWidth: DataDrivenPropertyValueSpecification<number>;
  lineSortKey?: ExpressionSpecification;
  textField?: ExpressionSpecification;
  textSize?: ExpressionSpecification;
}

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

export type CategoryOptions = {
  /** Label for the category */
  label: string;
};

export interface CategoryValueRecord<T> {
  value: T;
}

export interface CategoryOptionsRecord {
  /** Value expression for the category. Simple values are compared directly (. Expression specifications are  */
  value: string;
  label: string;
}

export type OptionallySimpleInteractive<T extends StyleValue = StyleValue> =
  | T
  | InteractiveExpression<T>;

export type OptionallyZoomInteractive<T extends StyleValue = StyleValue> =
  | ZoomExpression<T>
  | ZoomExpression<InteractiveExpression<T>>;

// Symbology Options

/** Configuration used for fixed/static data layers */
export interface FixedSymbologyOptions<T extends StyleValue = StyleValue> {
  mode: "fixed";

  style: OptionallySimpleInteractive<T> | OptionallyZoomInteractive<T>;
}

/** Configuration used for categorical data layers */
export interface CategorySymbologyOptions<T extends StyleValue = StyleValue> {
  mode: "category";

  /** Field from which categories are derived */
  field: string;

  /** Maps categories to value */
  value: {
    /** The label for this category */
    label: string;
    /** The value found in `field` that signifies this category */
    category: string | number;
    /** The style used for this category */
    style: OptionallySimpleInteractive<T> | OptionallyZoomInteractive<T>;
  }[];

  /** Style used when no category is matched */
  defaultStyle: OptionallySimpleInteractive<T> | OptionallyZoomInteractive<T>;
}

export type DecisionOperator = "==" | "!=" | ">" | "<" | "<=" | ">=";

/** Configuration used for conditionally-styled data layers */
export interface CaseSymbologyOptions<T extends StyleValue = StyleValue> {
  mode: "case";

  /** Field from which categories are derived */
  field: string;

  /** Cases and their associated style values */
  value: {
    /** Optional label, otherwise generated from operator and value */
    label?: string;
    /** The operator comparing the field's value against `operand` */
    operator: DecisionOperator;
    /** The value to compare the field's value against */
    operand: number;
    /** The style used in this case */
    style: OptionallySimpleInteractive<T> | OptionallyZoomInteractive<T>;
  }[];
}

export type RampType =
  | "step"
  | "linear"
  | "square"
  | "log"
  | "ease-in"
  | "ease-out"
  | "ease-in-out";

/** Configuration used for value controlled on interpolation on data (e.g. choropleth) */
export interface RampSymbologyOptions<T extends StyleValue = StyleValue> {
  mode: "ramp";

  /** Field from which values are interpolated for the ramp */
  field: string;

  /** The type of interpolation used.  Step uses discrete steps */
  type: RampType;

  /** Ramp points and their associated style values */
  value: {
    /** The label placed at this point in the ramp.  Usually used for first and last steps */
    label?: string;
    /** The value compared against `field` that defines this point in the ramp */
    value?: number;
    /** The style used at this point in the ramp */
    style: OptionallySimpleInteractive<T> | OptionallyZoomInteractive<T>;
  }[];
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

/** Simplified configuration should cover most cases */
export interface SimplifiedSymbologyConfig {
  mode: "simplified";
  /** The type of geometry being styled */
  geoType: GeoType;


  // Discrete Fields
  /** Color specification to apply to all features in layer */
  color?: SymbologyOptions<string>;
  /** Color specification to apply to borders of all features */
  borderColor?: SymbologyOptions<string>;

  // Continuous Fields
  /** Override opacity settings */
  opacity?: SymbologyOptions<number>;
  /** Override border width */
  borderWidth?: SymbologyOptions<number>;
  /** Override border opacity */
  borderOpacity?: SymbologyOptions<number>;

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
  paint?: FillPaintSpec & LinePaintSpec;
  layout?: FillLayoutSpec & LineLayoutSpec;
}
/** Manually provided symbology configuration using maplibre style specification */
export type RawSymbologyConfig =
  | RawCircleSymbologyConfig
  | RawLineSymbologyConfig
  | RawPolygonSymbologyConfig;

export type SymbologyConfig = SimplifiedSymbologyConfig | RawSymbologyConfig;
