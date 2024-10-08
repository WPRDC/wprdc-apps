/**
 *
 * ColorPicker types
 *
 **/
import { type Key } from "react";
import type {
  ColorSwatchPickerItemProps,
  ColorAreaProps as RAColorAreaProps,
  ColorFieldProps as RAColorFieldProps,
  ColorPickerProps as RAColorPickerProps,
  ColorSliderProps as RAColorSliderProps,
  ColorSwatchPickerProps as RAColorSwatchPickerProps,
  ColorSwatchProps as RAColorSwatchProps,
  ColorThumbProps as RAColorThumbProps,
  ValidationResult,
} from "react-aria-components";

export interface ColorPickerProps
  extends RAColorPickerProps,
    React.AriaAttributes {
  label?: string;
  labelledBy?: string;
  children?: React.ReactNode;
  variant?: "default" | "no-text" | "labelled";
  className?: string;
}

export interface ColorAreaProps
  extends RAColorAreaProps,
    React.RefAttributes<HTMLDivElement> {
  className?: string;
}

export interface ColorSliderProps
  extends RAColorSliderProps,
    React.RefAttributes<HTMLDivElement> {
  label?: string;
  className?: string;
  showValue?: boolean;
}

export interface ColorSwatchProps
  extends RAColorSwatchProps,
    React.RefAttributes<HTMLDivElement> {
  className?: string;
}

export interface ColorFieldProps
  extends RAColorFieldProps,
    React.RefAttributes<HTMLDivElement> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export interface ColorOption {
  id: Key;
  color: ColorSwatchPickerItemProps["color"];
  label?: string;
}

export interface ColorSwatchPickerProps
  extends RAColorSwatchPickerProps,
    React.RefAttributes<HTMLDivElement> {
  colors: ColorOption[];
  className?: string;
}

export interface ColorThumbProps
  extends RAColorThumbProps,
    React.RefAttributes<HTMLDivElement> {
  className?: string;
}
