"use client";

import {
  Input,
  Label,
  ListBox,
  Popover,
  ComboBox as RAComboBox,
  Text,
} from "react-aria-components";
import { BiSearchAlt2 } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { Typography } from "../typography";
import type { ComboBoxProps } from "./ComboBox.types";

export function ComboBox<T extends object>({
  label,
  description,
  variant = "default",
  className,
  children,
  placeholder,
  ...props
}: ComboBoxProps<T>): React.ReactElement {
  return (
    <RAComboBox
      {...props}
      aria-label={label}
      className={twMerge("relative", className)}
    >
      {variant !== "search-nav" ? (
        <Label className={twMerge("flex items-stretch pb-1")}>
          <Typography.Label>{label}</Typography.Label>
        </Label>
      ) : null}

      <div
        className={twMerge(
          variant === "search-nav" ? "absolute flex" : "hidden",
          "h-full items-center rounded-l-md border-r border-black bg-stone-900",
        )}
      >
        <BiSearchAlt2
          className={twMerge(
            "mx-1",
            variant === "search-nav" && "size-8 text-white",
          )}
        />
      </div>
      <Input
        className={twMerge(
          "w-full rounded border-2 border-stone-800 py-1",
          variant === "search-nav" ? "pl-11 pr-2" : "px-2",
        )}
        placeholder={placeholder}
      />

      {description ? <Text slot="description">{description}</Text> : null}

      <Popover className="w-[--trigger-width] border border-stone-800 shadow-md">
        <ListBox className="bg-white p-2">{children}</ListBox>
      </Popover>

      {props.inputValue && props.inputValue.length < 4 ? (
        <div className="absolute w-[--trigger-width]">
          <div className="ml-11 bg-white/40 px-1 py-0.5 text-xs backdrop-blur-md">
            Type at least 4 characters to see results
          </div>
        </div>
      ) : null}
    </RAComboBox>
  );
}
