"use client";

import {
  Button,
  ComboBox as RAComboBox,
  FieldError,
  Input,
  Label,
  Popover,
  Text,
} from "react-aria-components";
import type { ComboBoxProps } from "./ComboBox.types";
import { TbChevronDown } from "react-icons/tb";
import { ListBox } from "../list-box";

export function ComboBox<T extends object>({
  label,
  description,
  errorMessage,
  children,
  ...props
}: ComboBoxProps<T>) {
  return (
    <RAComboBox allowsEmptyCollection {...props}>
      <Label>{label}</Label>
      <div className="my-combobox-container">
        <Input />
        <Button>
          <TbChevronDown size={16} />
        </Button>
      </div>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <ListBox
        renderEmptyState={() => <div className="my-item">No results found</div>}
      >
        {children}
      </ListBox>
    </RAComboBox>
  );
}
