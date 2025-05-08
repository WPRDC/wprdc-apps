import { SimpleFixedSymbologyOptions } from "@wprdc/types";

export const DEFAULT_COLOR: string = "#000000";
export const DEFAULT_WIDTH: number = 1;
export const DEFAULT_OPACITY: number = 0.8;
export const DEFAULT_LINE_OPACITY: number = 1;

function asOption<T extends number | string>(
  value: T,
): SimpleFixedSymbologyOptions<T> {
  return {
    mode: "fixed",
    value,
  };
}

export const DEFAULT_COLOR_OPTION: SimpleFixedSymbologyOptions<string> =
  asOption<string>("#000000");
export const DEFAULT_WIDTH_OPTION: SimpleFixedSymbologyOptions<number> =
  asOption<number>(1);
export const DEFAULT_OPACITY_OPTION: SimpleFixedSymbologyOptions<number> =
  asOption<number>(0.8);
export const DEFAULT_LINE_OPACITY_OPTION: SimpleFixedSymbologyOptions<number> =
  asOption<number>(1);

export type StyleKey =
  | "color"
  | "borderColor"
  | "opacity"
  | "borderWidth"
  | "borderOpacity"
  | "textSize";

export const DEFAULT_VALUES: Record<StyleKey, string| number> = {
  color: DEFAULT_COLOR,
  borderColor: DEFAULT_COLOR,
  opacity: DEFAULT_OPACITY,
  borderOpacity: DEFAULT_LINE_OPACITY,
  borderWidth: DEFAULT_WIDTH,
  textSize: 5
}

export const STYLE_KEYS: StyleKey[] = [
  "color",
  "borderColor",
  "opacity",
  "borderWidth",
  "borderOpacity",
  "textSize",
];
