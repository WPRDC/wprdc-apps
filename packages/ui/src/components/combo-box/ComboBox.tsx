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
  variant = "default",
  className,
  children,
  ...props
}: ComboBoxProps<T>): React.ReactElement {
  return (
    <RAComboBox {...props} className={twMerge("relative", className)}>
      <Label
        className={twMerge(
          "flex items-center pb-1",
          variant === "search-nav" && "absolute z-10",
        )}
      >
        <TbSearch
          className={twMerge("pr-0.5", variant === "search-nav" && "size-8")}
        />
        {variant !== "search-nav" && (
          <Typography.Label>{label}</Typography.Label>
        )}
      </Label>

      <Input
        className={twMerge(
          "w-full rounded-sm border border-stone-800 px-2 py-1",
        )}
      />

      {description ? <Text slot="description">{description}</Text> : null}
      <FieldError>{errorMessage}</FieldError>

      <Popover className="w-[--trigger-width] border border-stone-800 shadow-md">
        <ListBox className="bg-white p-2">{children}</ListBox>
      </Popover>
    </RAComboBox>
  );
}
