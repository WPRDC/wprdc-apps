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
    <div className="relative inline-flex w-full flex-col">
      <label
        className="block cursor-default text-left font-mono text-xs font-semibold uppercase text-gray-500"
        {...labelProps}
      >
        {props.label}
      </label>
      <div
        {...groupProps}
        className={classNames(
          "hover:border-focused-600 bg-background flex w-full flex-row items-center border border-black pr-1 transition duration-150 ease-in-out",
          {
            "ring-focused-400 border-focused-400 outline-none ring-1":
              isFocusVisible || isFocused,
          },
        )}
      >
        <input
          className="flex-grow bg-transparent px-2 py-1 text-sm placeholder:italic placeholder:text-gray-400 focus:outline-none"
          {...inputProps}
          {...focusProps}
          ref={inputRef}
        />
        <div className="ml-1.5 flex h-full flex-col justify-center">
          <button
            className="text-xs"
            type="button"
            {...incrementProps}
            ref={decRef}
          >
            <RiArrowUpSFill />
          </button>
          <button
            className="text-xs"
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
