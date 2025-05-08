/**
 *
 * LayerMenu types
 *
 **/

import {
  CategoryOptionsRecord,
  CategorySymbologyConfig,
  InteractiveExpression,
  LayerConfig,
  OptionallySimpleInteractive,
  OptionallyZoomInteractive,
  SimpleCategorySymbologyOptions,
  SimpleFixedSymbologyOptions,
  StyleValue,
  ZoomFixedSymbologyOptions,
} from "@wprdc/types";

export interface LayerMenuProps {
  defaultConfig: LayerConfig;
  onSubmit: (layer: LayerConfig) => void;
  onClose: () => void;
}

export interface CategoryMenuItemProps<T extends StyleValue = StyleValue> {
  value?: string;
  label?: string;
  onChange?: (options: CategoryOptionsRecord) => void;
}

export interface CategoryMenuProps
  extends Pick<CategorySymbologyConfig, "field" | "categories"> {
  onChange: (field: string, categories: CategoryOptionsRecord[]) => void;
}

export interface ZoomMenuItemProps<
  T extends number | InteractiveExpression<number>,
> {
  field?: string;
  zoom?: number;
  value?: T;
  onChange?: (value: T) => void;
}

export interface InteractiveSymbologyMenuProps<
  T extends StyleValue = StyleValue,
> {
  value: InteractiveExpression<T>;
}

export type SymbologyMenuMode = "fixed" | "category" | "zoom";

// Individual Symbology Props
/** For fixed values */
export interface FixedSymbologyMenuOptions<T extends StyleValue> {
  mode: "fixed";
  options: SimpleFixedSymbologyOptions<T>;
  onChange: (value: OptionallySimpleInteractive<T>) => void;
}

export type FixedSymbologyMenuProps<T extends StyleValue> = Omit<
  FixedSymbologyMenuOptions<T>,
  "mode"
>;

/** For values by zoom */
export interface ZoomSymbologyMenuOptions {
  mode: "zoom";
  options: ZoomFixedSymbologyOptions;
  /** name of field being styled */
  field: string;
  /** units used with field being styled */
  units: string;
  onChange: (value: OptionallyZoomInteractive<number>) => void;
}

export type ZoomSymbologyMenuProps = Omit<ZoomSymbologyMenuOptions, "mode">;

/** For values by category */
export interface CategorySymbologyMenuOptions<T extends StyleValue> {
  mode: "category";
  options: SimpleCategorySymbologyOptions<T>;
  onChange: (
    values: Record<string | number, OptionallySimpleInteractive<T>>,
  ) => void;
  categories?: CategoryOptionsRecord[];
}

export type CategorySymbologyMenuProps<T extends StyleValue> = Omit<
  CategorySymbologyMenuOptions<T>,
  "mode"
>;

/** Common symbology menu props */
export type SymbologyMenuOptions<T extends StyleValue> = (
  | FixedSymbologyMenuOptions<T>
  | ZoomSymbologyMenuOptions
  | CategorySymbologyMenuOptions<T>
) & {
  onModeChange: (value: SymbologyMenuMode) => void;
  categories?: CategoryOptionsRecord[];
  field?: string;
  units?: string;
};

export type SymbologyMenuProps<T extends StyleValue> = Omit<
  SymbologyMenuOptions<T>,
  "mode"
>;


export interface ModeMenuProps{
  selection: "simple" | "category";
  onSelectionChange: (selection: "simple" | "category") => void;

}