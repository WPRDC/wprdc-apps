"use client";

import { ColorThumb as RAColorThumb } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { type ColorThumbProps } from "./ColorPicker.types";

export function ColorThumb({
  className,
  ...props
}: ColorThumbProps): React.ReactElement {
  return (
    <RAColorThumb
      {...props}
      className={twMerge(
        "box-border size-4 rounded-full border-2 border-white shadow-[0_0_0_1px_#27272a,inset_0_0_0_1px_#27272a] focus-visible:size-5",
        className,
      )}
    />
  );
}
