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
  variant,
  ...buttonProps
}: ButtonProps): React.ReactElement {
  return (
    <RAButton
      {...buttonProps}
      className={twMerge(
        "rounded border border-stone-800 bg-background",
        "font-mono font-semibold uppercase",
        "shadow active:shadow-sm hover:shadow-md",
        "transition delay-75 ",
        variant === "success" && "border-green-900 bg-green-800 text-white",
        dense
          ? "rounded-sm px-0.5 py-0 text-xs shadow-none hover:shadow-sm"
          : "px-1 py-0.5 text-sm",
        buttonProps.isDisabled
          ? "cursor-not-allowed bg-gray-100 text-gray-500"
          : "cursor-pointer",
        className,
      )}
    >
      {children}
    </RAButton>
  );
}
