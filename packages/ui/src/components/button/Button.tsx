/**
 *
 * Button
 *
 * Press it
 *
 */
import * as React from "react";
import { useRef } from "react";
import { useButton } from "react-aria";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import type { ButtonProps } from "./Button.types.ts";

export function Button(props: ButtonProps): React.ReactElement {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, props.buttonRef ?? ref);
  const { children, variant = "default", dense = false } = props;

  /* eslint-disable react/button-has-type -- default type of 'button' is provided */
  return (
    <button
      type={props.type ?? "button"}
      {...buttonProps}
      className={twMerge(
        classNames(
          "ui-m1 ui-border-border ui-rounded ui-border",
          "ui-font-mono ui-uppercase ui-leading-tight",
          "ui-shadow-md hover:ui-shadow-lg active:ui-shadow-sm",
          dense ? "ui-px-1 ui-py-0.5 ui-text-sm" : "ui-px-2 ui-py-1.5",
          {
            "ui-bg-backgroundSecondary dark:ui-bg-backgroundSecondaryDark dark:ui-border-borderDark ui-text-black dark:ui-text-white":
              variant === "default",
          },
        ),

        props.className,
      )}
      ref={props.buttonRef}
    >
      {children}
    </button>
  );
}
