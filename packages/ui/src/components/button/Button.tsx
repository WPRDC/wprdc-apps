/**
 *
 * Button
 *
 * Press it
 *
 */
"use client";
import { twMerge } from "tailwind-merge";
import { Button as RAButton } from "react-aria-components";
import type { ButtonProps } from "./Button.types";

export function Button({
  dense,
  className,
  children,
  ...buttonProps
}: ButtonProps): React.ReactElement {
  "use client";
  return (
    <RAButton
      {...buttonProps}
      className={twMerge(
        "m-1 rounded border border-stone-800 bg-background",
        "font-mono font-semibold uppercase",
        "shadow-md active:shadow-sm hover:bg-primary/60 hover:shadow-lg",
        "transition delay-75 ",
        dense
          ? "rounded-sm px-0.5 py-0 text-xs shadow-none hover:shadow-sm"
          : "px-1 py-0.5 text-sm",
        className,
      )}
    >
      {children}
    </RAButton>
  );
}
