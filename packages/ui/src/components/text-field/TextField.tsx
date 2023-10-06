/**
 *
 * Text-Field
 *
 * Form field for text input.
 *
 */
import * as React from "react";
import type { TextFieldAria } from "react-aria";
import { useTextField } from "react-aria";
import type { TextFieldProps } from "./TextField.types.ts";

// mapping of possible html element names to their types.
interface Elems {
  input: HTMLInputElement;
  textarea: HTMLTextAreaElement;
}

export function TextField<T extends "input" | "textarea">(
  props: TextFieldProps<T>,
): React.ReactElement {
  const { label, inputElementType } = props;
  const ref = React.useRef<Elems[T]>(null);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField<T>(props, ref);

  const input = React.useMemo(() => {
    if (inputElementType === "textarea")
      return (
        <textarea
          {...(inputProps as TextFieldAria<"textarea">)}
          className="focus:border-focused-400 hover:border-focused-600 focus:ring-focused-400 block w-full border border-black px-2 py-1 text-sm transition duration-150 ease-in-out placeholder:italic placeholder:text-gray-400 focus:outline-none focus:ring-1"
          ref={ref as React.RefObject<HTMLTextAreaElement>}
        />
      );
    return (
      <input
        {...(inputProps as TextFieldAria)}
        className="focus:border-focused-400 hover:border-focused-600 focus:ring-focused-400 block w-full border border-black px-2 py-1 text-sm transition duration-150 ease-in-out placeholder:italic placeholder:text-gray-400 focus:outline-none focus:ring-1"
        ref={ref as React.RefObject<HTMLInputElement>}
      />
    );
  }, [inputElementType, inputProps]);

  return (
    <div className="relative inline-flex w-full flex-col">
      <label
        {...labelProps}
        className="block cursor-default text-left font-mono text-xs font-semibold uppercase text-gray-500"
      >
        {label}
      </label>
      {input}
      {props.description ? (
        <div {...descriptionProps} className="text-xs">
          {props.description}
        </div>
      ) : null}
      {props.errorMessage ? (
        <div
          {...errorMessageProps}
          className="text-xs font-medium text-red-800"
        >
          {props.errorMessage}
        </div>
      ) : null}
    </div>
  );
}
