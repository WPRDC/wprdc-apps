/**
 *
 * Button
 *
 * Press it
 *
 */

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
  return (
    <RAButton
      {...buttonProps}
      className={twMerge(
        "m1 rounded border-2",
        "font-mono uppercase leading-tight",
        "shadow-md hover:shadow-lg active:shadow-sm",
        dense ? "px-1 py-0.5 text-sm" : "px-2 py-1.5",
        variant === "default" &&
          "bg-backgroundSecondary  dark:border-borderDark dark:bg-backgroundSecondaryDark dark:text-white",
        className,
      )}
    >
      {children}
    </RAButton>
  );
}
