"use client";

import { ColorSwatch as RAColorSwatch } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { type ColorSwatchProps } from "./ColorPicker.types";

export function ColorSwatch({
  className,
  ...props
}: ColorSwatchProps): React.ReactElement {
  return (
    <RAColorSwatch
      {...props}
      className={twMerge("h-6 w-6 rounded", className)}
      style={({ color }) => ({
        background: String(color),
      })}
    />
  );
}
