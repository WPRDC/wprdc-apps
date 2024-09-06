/**
 *
 * Input
 *
 * Interactive control used in forms.
 *
 **/
"use client";

import * as React from "react";
import { Input as RAInput } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { InputProps } from "./Input.types";

export function Input({ className, ...props }: InputProps): React.ReactElement {
  return (
    <RAInput
      {...props}
      className={twMerge(
        "w-full rounded border border-stone-400 px-1 py-0.5",
        className,
      )}
    />
  );
}
