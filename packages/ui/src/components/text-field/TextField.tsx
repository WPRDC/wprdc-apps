/**
 *
 * Text-Field
 *
 * Form field for text input.
 *
 */
"use client";

import { Input, Label, TextField as RATextField } from "react-aria-components";
import type { TextFieldProps } from "./TextField.types";

export function TextField({
  label,
  ...props
}: TextFieldProps): React.ReactElement {
  return (
    <RATextField {...props}>
      {!!label && <Label>{label}</Label>}
      <Input />
    </RATextField>
  );
}
