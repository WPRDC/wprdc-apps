"use client";

import {
  FieldError,
  Label,
  ColorField as RAColorField,
  Text,
} from "react-aria-components";
import { Typography } from "../typography";
import { Input } from "../input";
import { type ColorFieldProps } from "./ColorPicker.types";

export function ColorField({
  label,
  description,
  errorMessage,
  ...props
}: ColorFieldProps): React.ReactElement {
  return (
    <RAColorField {...props}>
      {label ? (
        <Typography.Label>
          <Label>{label}</Label>
        </Typography.Label>
      ) : null}
      <Input size={12} />
      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{errorMessage}</FieldError>
    </RAColorField>
  );
}
