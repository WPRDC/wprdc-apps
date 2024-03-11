"use client";

import { Radio as RARadio } from "react-aria-components";
import type { RadioProps } from "./RadioGroup.types";

export function Radio({ children, ...props }: RadioProps): React.ReactElement {
  return (
    <RARadio
      {...props}
      className="mr-1 cursor-pointer border border-transparent outline-none focus:border-focused-400 focus:ring focus:ring-focused-400"
    >
      {children}
    </RARadio>
  );
}
