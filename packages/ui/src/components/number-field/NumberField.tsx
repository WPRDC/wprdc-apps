/**
 *
 * Number-Field
 *
 * Form field for handling numeric data.
 *
 */
"use client";

import {
  Button,
  Group,
  Input,
  Label,
  NumberField as RANumberField,
} from "react-aria-components";
import type { NumberFieldProps } from "./NumberField.types";

export function NumberField({
  label,
  ...props
}: NumberFieldProps): React.ReactElement {
  return (
    <RANumberField {...props}>
      {!!label && <Label>{label}</Label>}
      <Group className="flex">
        <Button className="m-0 p-0" slot="decrement">
          -
        </Button>
        <Input />
        <Button className="m-0 p-0" slot="increment">
          +
        </Button>
      </Group>
    </RANumberField>
  );
}
