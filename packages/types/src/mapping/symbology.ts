import {
  ColorSpecification,
  ExpressionSpecification,
} from "@maplibre/maplibre-gl-style-spec";
import {
  CircleLayerSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
} from "maplibre-gl";
import { MapState } from "./shared";

export type CirclePaintSpec = NonNullable<CircleLayerSpecification["paint"]>;
export type CircleLayoutSpec = NonNullable<CircleLayerSpecification["layout"]>;
export type FillPaintSpec = NonNullable<FillLayerSpecification["paint"]>;
export type FillLayoutSpec = NonNullable<FillLayerSpecification["layout"]>;
export type LinePaintSpec = NonNullable<LineLayerSpecification["paint"]>;
export type LineLayoutSpec = NonNullable<LineLayerSpecification["layout"]>;

export type StyleValue = string | number | ColorSpecification;

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

type DiscreteSymbologyProps = {
  /** Color specification to apply to all features in layer */
  color: ColorSpecification;
  /** Color specification to apply to borders of all features */
  borderColor: ColorSpecification;
};

type ContinuousSymbologyProps = {
  /** Override opacity settings */
  opacity: number;

  /** Override border width */
  borderWidth: number;
  /** Override border opacity */
  borderOpacity: number;
};

/** Props for layers with features styled the same */
export type SolidSymbologyProps = DiscreteSymbologyProps &
  ZoomConfig<ContinuousSymbologyProps> & {
    symbologyMode: SymbologyMode.Solid;
  };

/** Props for layers with features styled based on categorization using underlying data */
export type QualitativeSymbologyProps = ZoomConfig<ContinuousSymbologyProps> & {
  symbologyMode: SymbologyMode.Qualitative;

  /** Maps categories to their colors */
  colors: {
    /** Field to check categories against from */
    field: string;
    /** Maps categories to colors */
    categories: Record<string | number, CategoryOptions>;
  };
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

export type InteractiveSymbologyProps = Partial<
  InteractiveConfig<DiscreteSymbologyProps> &
    InteractiveConfig<ContinuousSymbologyProps>
> & {
  symbologyMode: SymbologyMode.Interactive;

  /**
   * Property of layer feature that represents a unique ID.
   *  Used for selection and hover style states.
   */
  idField: string;

  /** Maplibre expression that indicates which features to ignore wrt interaction */
  ignoreCase?: ExpressionSpecification;

  clickPopup?: (props: MapState) => React.ReactElement;
};

/** Props for layers with features styled with ramps using underlying data */
// export interface SequentialSymbologyProps extends BaseSymbologyProps {}

export type SymbologyProps =
  | SolidSymbologyProps
  | QualitativeSymbologyProps
  | InteractiveSymbologyProps;
