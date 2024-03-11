"use client";

import {
  ComboBox as RAComboBox,
  FieldError,
  Input,
  Label,
  ListBox,
  Text,
} from "react-aria-components";
import { TbSearch } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { Popover } from "../popover";
import { Typography } from "../typography";
import type { ComboBoxProps } from "./ComboBox.types";

export function ComboBox<T extends object>({
  label,
  description,
  errorMessage,
  className,

  children,
  ...props
}: ComboBoxProps<T>): React.ReactElement {
  return (
    <RAComboBox {...props} className={twMerge("relative", className)}>
      <Label className="flex items-center pb-1">
        <TbSearch className="pr-0.5" />
        <Typography.Label>{label}</Typography.Label>
      </Label>

      <Input className="w-full rounded-sm border border-stone-800 px-2 py-1" />

      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{errorMessage}</FieldError>

      <Popover className="w-[--trigger-width] border border-stone-800 shadow-md">
        <ListBox className="bg-white p-2">{children}</ListBox>
      </Popover>
    </RAComboBox>
  );
}
