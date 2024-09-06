"use client";

import { ColorArea as RAColorArea } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { type ColorAreaProps } from "./ColorPicker.types";
import { ColorThumb } from "./ColorThumb";

export function ColorArea({
  className,
  ...props
}: ColorAreaProps): React.ReactElement {
  return (
    <RAColorArea
      {...props}
      className={twMerge(
        "size-40 rounded-md border border-stone-500",
        className,
      )}
    >
      <ColorThumb />
    </RAColorArea>
  );
}
