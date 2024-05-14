/**
 *
 * Text-Field
 *
 * Form field for text input.
 *
 */
"use client";

import {
  Input,
  Label,
  TextArea,
  TextField as RATextField,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { Typography } from "../typography";
import type { TextFieldProps } from "./TextField.types";

export function TextField({
  label,
  inputClassName,
  textarea = false,
  placeholder,
  rows = 3,
  ...props
}: TextFieldProps): React.ReactElement {
  return (
    <RATextField {...props}>
      {!!label && (
        <Typography.Label className={twMerge(textarea && "block")}>
          <Label>{label}</Label>
        </Typography.Label>
      )}
      {textarea ? (
        <TextArea
          className={twMerge(
            "w-full rounded border border-stone-800 p-1 text-sm",
            inputClassName,
          )}
          rows={rows}
          placeholder={placeholder}
        />
      ) : (
        <Input placeholder={placeholder} />
      )}
    </RATextField>
  );
}
