import type {
  ColorSpecification,
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

export type StyleValue = string | number;

export type ZoomOption<T extends StyleValue | InteractiveOption<StyleValue>> = [
  number,
  T,
][];

export interface InteractiveOption<T extends StyleValue> {
  default: T;
  selected: T;
  hovered: T;
}

export type InteractiveStyleOption<T extends StyleValue> =
  | T
  | InteractiveOption<T>
  | ZoomOption<T>
  | ZoomOption<InteractiveOption<T>>
  | undefined;

export type ZoomStyleOption<T extends StyleValue> =
  | T
  | ZoomOption<T>
  | undefined;

export type StyleOption<T extends StyleValue> =
  | ZoomStyleOption<T>
  | InteractiveStyleOption<T>;

type ZoomConfig<T extends Record<string, StyleValue>> = Partial<{
  [K in keyof T]: ZoomStyleOption<T[K]>;
}>;

type InteractiveConfig<T extends Record<string, StyleValue>> = {
  [K in keyof T]: InteractiveStyleOption<T[K]>;
};

/** Possible ways of styling features */
export enum SymbologyMode {
  Solid = "solid",
  Qualitative = "qualitative",
  // Sequential = "sequential",
  Interactive = "interactive",
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- need to use type
type DiscreteSymbologyProps = {
  /** Color specification to apply to all features in layer */
  color: ColorSpecification;
  /** Color specification to apply to borders of all features */
  borderColor: ColorSpecification;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- need to use type
type ContinuousSymbologyProps = {
  /** Override opacity settings */
  opacity: number;
  /** Override border width */
  borderWidth: number;
  /** Override border opacity */
  borderOpacity: number;
  /** Override font size for labels if they are present */
  textSize: number;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- need to use type
type TextSymbologyProps = {
  /** Expression that returns a string to use as a label */
  textField?: ExpressionSpecification;
  /** Expression that returns a string to use as a subtitle to `textField` */
  subtitleTextField?: ExpressionSpecification;
};

/** Category definition */
export interface CategoryOptions {
  /** Label for the category */
  label: string;
  /** Color of the symbol for the category */
  color: ColorSpecification;
  /** Border color for symbol of the category */
  borderColor?: ColorSpecification;
}

/** Props for layers with features styled the same */
export interface SolidSymbologyProps {
  symbologyMode: SymbologyMode.Solid;
  symbology: TextSymbologyProps &
    DiscreteSymbologyProps &
    ZoomConfig<ContinuousSymbologyProps>;
}

interface QualitativeColorOptions {
  /** Maps categories to their colors */
  colors: {
    /** Field to check categories against from */
    field: string;
    /** Maps categories to colors */
    categories: Record<string | number, CategoryOptions>;
  };
}

/** Props for layers with features styled based on categorization using underlying data */
export interface QualitativeSymbologyProps {
  symbologyMode: SymbologyMode.Qualitative;
  symbology: TextSymbologyProps &
    QualitativeColorOptions &
    ZoomConfig<ContinuousSymbologyProps>;
}

export interface InteractiveSymbologyProps {
  symbologyMode: SymbologyMode.Interactive;
  symbology: TextSymbologyProps &
    Partial<
      InteractiveConfig<DiscreteSymbologyProps> &
        InteractiveConfig<ContinuousSymbologyProps>
    >;
}

/** Props for layers with features styled with ramps using underlying data */
// export interface SequentialSymbologyProps extends BaseSymbologyProps {}

export type SymbologyProps =
  | SolidSymbologyProps
  | QualitativeSymbologyProps
  | InteractiveSymbologyProps;
