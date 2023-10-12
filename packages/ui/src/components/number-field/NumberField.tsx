/**
 *
 * Number-Field
 *
 * Form field for handling numeric data.
 *
 */
import * as React from "react";
import { useNumberField, useLocale, useButton, useFocusRing } from "react-aria";
import { useNumberFieldState } from "react-stately";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import classNames from "classnames";
import type { NumberFieldProps } from "./NumberField.types.ts";

export function NumberField(props: NumberFieldProps): React.ReactElement {
  const { locale } = useLocale();
  const state = useNumberFieldState({ ...props, locale });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const incrRef = React.useRef<HTMLButtonElement>(null);
  const decRef = React.useRef<HTMLButtonElement>(null);

  const { isFocusVisible, isFocused, focusProps } = useFocusRing();

  const {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef);

  const { buttonProps: incrementProps } = useButton(
    incrementButtonProps,
    incrRef,
  );
  const { buttonProps: decrementProps } = useButton(
    decrementButtonProps,
    decRef,
  );

  return (
    <div className="ui-relative ui-inline-flex ui-w-full ui-flex-col">
      <label
        className="ui-block ui-cursor-default ui-text-left ui-font-mono ui-text-xs ui-font-semibold ui-uppercase ui-text-gray-500"
        {...labelProps}
      >
        {props.label}
      </label>
      <div
        {...groupProps}
        className={classNames(
          "ui-flex ui-w-full ui-flex-row ui-items-center ui-border ui-border-black ui-bg-background ui-pr-1 ui-transition ui-duration-150 ui-ease-in-out hover:ui-border-focused-600",
          {
            "ui-border-focused-400 ui-outline-none ui-ring-1 ui-ring-focused-400":
              isFocusVisible || isFocused,
          },
        )}
      >
        <input
          className="ui-flex-grow ui-bg-transparent ui-px-2 ui-py-1 ui-text-sm placeholder:ui-italic placeholder:ui-text-gray-400 focus:ui-outline-none"
          {...inputProps}
          {...focusProps}
          ref={inputRef}
        />
        <div className="ui-ml-1.5 ui-flex ui-h-full ui-flex-col ui-justify-center">
          <button
            className="ui-text-xs"
            type="button"
            {...incrementProps}
            ref={decRef}
          >
            <RiArrowUpSFill />
          </button>
          <button
            className="ui-text-xs"
            type="button"
            {...decrementProps}
            ref={incrRef}
          >
            <RiArrowDownSFill />
          </button>
        </div>
      </div>
    </div>
  );
}
