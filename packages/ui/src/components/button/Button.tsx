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
import type { ButtonProps } from "./Button.types.ts";

export function Button({
  dense,
  variant,
  className,
  children,
  ...buttonProps
}: ButtonProps): React.ReactElement {
  "use client";
  return (
    <RAButton
      {...buttonProps}
      className={twMerge(
        "m-1 rounded border border-stone-800",
        "font-mono font-semibold uppercase",
        "shadow-md hover:shadow-lg active:shadow-sm",
        dense ? "rounded-sm px-0.5 py-0 text-xs" : "px-1 py-0.5 text-sm",
        variant === "default" &&
          "bg-backgroundSecondary dark:border-borderDark dark:bg-backgroundSecondaryDark dark:text-white",
        className,
      )}
    >
      {children}
    </RAButton>
  );
}
