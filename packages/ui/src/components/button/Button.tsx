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
import type { ButtonProps } from "./Button.types.ts";

export function Button(props: ButtonProps): React.ReactElement {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, props.buttonRef ?? ref);
  const { children } = props;

  /* eslint-disable react/button-has-type -- default type of 'button' is provided */
  return (
    <button
      type={props.type ?? "button"}
      {...buttonProps}
      className={props.className}
      ref={props.buttonRef}
    >
      {children}
    </button>
  );
}
