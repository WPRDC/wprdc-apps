/**
 *
 * Button
 *
 * Press it
 *
 */
"use client";

import { Button as RAButton } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tw } from "../../util";
import type { ButtonProps, ButtonVariant } from "./Button.types";

// export styles for use with other components
export const buttonBaseStyle = tw`cursor-pointer rounded border px-1 py-1 font-mono text-sm font-semibold uppercase leading-none shadow active:shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-focused`;
export const buttonVariants: Record<ButtonVariant, string> = {
  primary: tw`border-2 border-text bg-primary text-black dark:border-text`,
  success: tw`"border-green-900 bg-green-800 text-white`,
  secondary: tw`border-2 border-text bg-cyan-200 text-text`,
  borderless: tw`border-none bg-transparent text-text shadow-none hover:shadow-none`,
  default: tw`border-stone-800 bg-white text-text`,
  warning: tw`border-warning-800 bg-warning-300 text-black`,
  danger: tw`border-red-900 bg-red-200 text-red-800`,
  info: tw`border-indigo-800 bg-indigo-300 text-black`,
};

export const buttonDisabledStyle = tw`cursor-not-allowed bg-gray-100 text-gray-500`;
export const buttonDenseStyle = tw`rounded-sm px-0.5 py-0 text-xs shadow-none hover:shadow-sm`;

export function Button({
  dense,
  className,
  children,
  variant,
  icon: Icon,
  ...buttonProps
}: ButtonProps): React.ReactElement {
  return (
    <RAButton
      {...buttonProps}
      className={twMerge(
        buttonBaseStyle,
        buttonVariants[variant ?? "default"],
        dense && buttonDenseStyle,
        buttonProps.isDisabled && buttonDisabledStyle,
        className,
      )}
    >
      {Icon ? (
        <div className="flex items-center space-x-1">
          <Icon />
          {!!children && <div>{children}</div>}
        </div>
      ) : (
        <>{children}</>
      )}
    </RAButton>
  );
}
