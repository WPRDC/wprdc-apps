"use client";

import {
  ColorSwatchPicker as RAColorSwatchPicker,
  ColorSwatchPickerItem,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { type ColorSwatchPickerProps } from "./ColorPicker.types";
import { ColorSwatch } from "./ColorSwatch";

export function ColorSwatchPicker({
  colors,
  className,
  ...props
}: ColorSwatchPickerProps): React.ReactElement {
  return (
    <RAColorSwatchPicker
      {...props}
      className={twMerge("grid grid-cols-5 gap-1.5", className)}
    >
      {colors.map((color) => (
        <ColorSwatchPickerItem
          className="relative w-fit rounded border border-stone-700  outline-none  forced-color-adjust-none focus-visible:outline focus-visible:outline-blue-500"
          key={color.id}
          color={color.color}
        >
          <ColorSwatch className="rounded border" />
        </ColorSwatchPickerItem>
      ))}
    </RAColorSwatchPicker>
  );
}
