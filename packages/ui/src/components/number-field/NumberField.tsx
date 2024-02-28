/**
 *
 * Number-Field
 *
 * Form field for handling numeric data.
 *
 */

import {
  NumberField as RANumberField,
  Label,
  Group,
  Input,
} from "react-aria-components";
import { Button } from "../button";
import type { NumberFieldProps } from "./NumberField.types";

export function NumberField({
  label,
  ...props
}: NumberFieldProps): React.ReactElement {
  return (
    <RANumberField {...props}>
      {!!label && <Label>{label}</Label>}
      <Group>
        <Button slot="decrement">-</Button>
        <Input />
        <Button slot="increment">+</Button>
      </Group>
    </RANumberField>
  );
}
