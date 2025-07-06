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
  isLoading,
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
      <div className="flex">
        <Input
          className={twMerge(
            "w-full rounded border-2 border-stone-800 py-1",
            variant === "search-nav" ? "pl-11 pr-2" : "px-2",
          )}
          placeholder={placeholder}
        />

        {isLoading && (
          <div className="absolute right-2 flex h-full items-center">
            <svg
              className="h-5 w-5 animate-spin text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="#000"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="#000"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </div>

      {description ? <Text slot="description">{description}</Text> : null}

      <Popover
        className={twMerge(
          "w-[--trigger-width] border border-stone-800 shadow-md",
        )}
      >
        <ListBox className={twMerge("bg-white p-2")}>{children}</ListBox>
      </Popover>

      {!isLoading && props.inputValue && props.inputValue.length < 4 ? (
        <div className="absolute w-[--trigger-width]">
          <div className="ml-11 bg-white/40 px-1 py-0.5 text-xs backdrop-blur-md">
            Type at least 4 characters to see results
          </div>
        </div>
      ) : null}
    </RAComboBox>
  );
}
