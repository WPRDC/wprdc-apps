import type {
  DataDrivenPropertyValueSpecification,
  ExpressionSpecification,
} from "@maplibre/maplibre-gl-style-spec";
import type {
  CircleLayerSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
} from "maplibre-gl";

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

export interface SimpleFixedSymbologyOptions<
  T extends StyleValue = StyleValue,
> {
  mode: "fixed";
  value: OptionallySimpleInteractive<T>;
}

export interface ZoomFixedSymbologyOptions {
  mode: "zoom";
  value: OptionallyZoomInteractive<number>;
}

export interface SimpleCategorySymbologyOptions<
  T extends StyleValue = StyleValue,
> {
  mode: "category";
  submode: "simple";

  /** Maps categories to value */
  value: Record<string | number, OptionallySimpleInteractive<T>>;
}

// not really used yet
export type ZoomCategorySymbologyOptions = {
  mode: "category";
  submode: "zoom";

  /** Field to check categories against from */
  field: string;
  /** Maps categories to value */
  value: Record<string | number, OptionallyZoomInteractive>;
};

interface ExpressionSpecificationSymbologyOption {
  mode: "expression";
  expression: ExpressionSpecification;
}

export type DiscreteValueSymbologyOptions = SimpleFixedSymbologyOptions<string>;
export type CategoryDiscreteValueSymbologyOptions =
  | SimpleFixedSymbologyOptions<string>
  | SimpleCategorySymbologyOptions<string>;

// continuous values can also be controlled on zoom
export type ContinuousValueSymbologyOptions =
  | SimpleFixedSymbologyOptions<number>
  | ZoomFixedSymbologyOptions;

export type CategoryContinuousValueSymbologyOptions =
  | SimpleFixedSymbologyOptions<number>
  | ZoomFixedSymbologyOptions
  | SimpleCategorySymbologyOptions<number>
  | ZoomCategorySymbologyOptions;

export interface SimpleSymbologyConfig {
  mode: "simple";

  categories?: undefined
  field?: undefined

  // Discrete Fields
  /** Color specification to apply to all features in layer */
  color?: DiscreteValueSymbologyOptions;
  /** Color specification to apply to borders of all features */
  borderColor?: DiscreteValueSymbologyOptions;

  // Continuous Fields
  /** Override opacity settings */
  opacity?: ContinuousValueSymbologyOptions;
  /** Override border width */
  borderWidth?: ContinuousValueSymbologyOptions;
  /** Override border opacity */
  borderOpacity?: ContinuousValueSymbologyOptions;

  // Text fields
  /** Expression that returns a string to use as a label */
  textField?: ExpressionSpecificationSymbologyOption;
  /** Expression that returns a string to use as a subtitle to `textField` */
  subtitleTextField?: ExpressionSpecificationSymbologyOption;
  /** Override font size for labels if they are present */
  textSize?: ContinuousValueSymbologyOptions;
}

export interface CategorySymbologyConfig {
  mode: "category";

  /** Field with categories */
  field: string;

  /** Category metadata */
  categories: CategoryOptionsRecord[];

  // Discrete Fields
  /** Color specification to apply to all features in layer */
  color?: CategoryDiscreteValueSymbologyOptions;
  /** Color specification to apply to borders of all features */
  borderColor?: CategoryDiscreteValueSymbologyOptions;

  // Continuous Fields
  /** Override opacity settings */
  opacity?: CategoryContinuousValueSymbologyOptions;
  /** Override border width */
  borderWidth?: CategoryContinuousValueSymbologyOptions;
  /** Override border opacity */
  borderOpacity?: CategoryContinuousValueSymbologyOptions;

  // Text fields
  /** Expression that returns a string to use as a label */
  textField?: ExpressionSpecificationSymbologyOption;
  /** Expression that returns a string to use as a subtitle to `textField` */
  subtitleTextField?: ExpressionSpecificationSymbologyOption;
  /** Override font size for labels if they are present */
  textSize?: CategoryContinuousValueSymbologyOptions;
}

export type SymbologyOptions = SimpleSymbologyConfig | CategorySymbologyConfig;
