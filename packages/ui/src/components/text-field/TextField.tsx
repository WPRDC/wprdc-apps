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

  const BASE_INPUT_STYLE =
    "ui-block ui-w-full ui-border ui-rounded ui-border-black ui-px-2 ui-py-1 ui-text-sm ui-transition ui-duration-150 ui-ease-in-out placeholder:ui-italic placeholder:ui-text-gray-400 hover:ui-border-focused-600";

  const input = React.useMemo(() => {
    if (inputElementType === "textarea")
      return (
        <textarea
          {...(inputProps as TextFieldAria<"textarea">)}
          className={BASE_INPUT_STYLE}
          ref={ref as React.RefObject<HTMLTextAreaElement>}
        />
      );
    return (
      <input
        {...(inputProps as TextFieldAria)}
        className={BASE_INPUT_STYLE}
        ref={ref as React.RefObject<HTMLInputElement>}
      />
    );
  }, [inputElementType, inputProps]);

  return (
    <div className="ui-relative ui-inline-flex ui-w-full ui-flex-col">
      <label
        {...labelProps}
        className="ui-block ui-cursor-default ui-text-left ui-font-mono ui-text-xs ui-font-semibold ui-uppercase ui-text-gray-500"
      >
        {label}
      </label>
      {input}
      {props.description ? (
        <div {...descriptionProps} className="ui-text-xs">
          {props.description}
        </div>
      ) : null}
      {props.errorMessage ? (
        <div
          {...errorMessageProps}
          className="ui-text-xs ui-font-medium ui-text-red-800"
        >
          {props.errorMessage}
        </div>
      ) : null}
    </div>
  );
}
