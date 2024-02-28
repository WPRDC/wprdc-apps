import {
  ColorSpecification,
  DataDrivenPropertyValueSpecification,
} from "@maplibre/maplibre-gl-style-spec";
import {
  CircleLayerSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
} from "maplibre-gl";
import { MapContext } from "./shared";

export type CirclePaintSpec = NonNullable<CircleLayerSpecification["paint"]>;
export type CircleLayoutSpec = NonNullable<CircleLayerSpecification["layout"]>;
export type FillPaintSpec = NonNullable<FillLayerSpecification["paint"]>;
export type FillLayoutSpec = NonNullable<FillLayerSpecification["layout"]>;
export type LinePaintSpec = NonNullable<LineLayerSpecification["paint"]>;
export type LineLayoutSpec = NonNullable<LineLayerSpecification["layout"]>;

/** Possible ways of styling features */
export enum StyleMode {
  Solid = "solid",
  Qualitative = "qualitative",
  // Sequential = "sequential",
}

export type StyleProp<T> =
  | DataDrivenPropertyValueSpecification<T>
  | ((
      context: MapContext & Record<string, any>,
    ) => DataDrivenPropertyValueSpecification<T>);

/** Symbology props common across all layers */
interface BaseSymbologyProps {
  /** Override opacity settings */
  opacity?: StyleProp<number>;
  /** Override border width */
  borderWidth?: StyleProp<number>;
  /** Override border opacity */
  borderOpacity?: StyleProp<number>;
}

/** Props for layers with features styled the same */
export interface SolidSymbologyProps extends BaseSymbologyProps {
  styleMode: StyleMode.Solid;
  /** Color specification to apply to all features in layer */
  color: ColorSpecification;
  /** Color specification to apply to borders of all features */
  borderColor?: ColorSpecification;
  /** Color specification to apply to selected features */
  selectedColor?: ColorSpecification;
}

/** Props for layers with features styled based on categorization using underlying data */
export interface QualitativeSymbologyProps extends BaseSymbologyProps {
  visualMode: StyleMode.Qualitative;
  /** Maps categories to their colors */
  colors: {
    /** Field to check categories against from */
    field: string;
    /** Maps categories to colors */
    categories: Record<string | number, CategoryOptions>;
  };
}

/** Category definition */
export interface CategoryOptions {
  /** Label for the category */
  label: string;
  /** Color of the symbol for the category */
  color: string;
  /** Border color for symbol of the category */
  borderColor?: string;
}

/** Props for layers with features styled with ramps using underlying data */
export interface SequentialSymbologyProps extends BaseSymbologyProps {}

export type SymbologyProps = SolidSymbologyProps | QualitativeSymbologyProps;

//
