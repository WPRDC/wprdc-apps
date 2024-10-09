"use client";

import { Radio as RARadio } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { RadioProps } from "./RadioGroup.types";

export function Radio({
  children,
  variant = "default",
  ...props
}: RadioProps): React.ReactElement {
  return (
    <RARadio
      {...props}
      className={twMerge(
        "focus:border-focused focus:ring-focused cursor-pointer border focus:ring",
        variant === "default" && "mr-1 border-transparent",
        variant === "chip" &&
          "mb-1 mr-2 inline-block rounded-md border-2 px-1 font-sans text-sm font-medium hover:bg-stone-100 selected:border-black selected:bg-primary/30 hover:selected:bg-stone-100",
      )}
    >
      {children}
    </RARadio>
  );
}
