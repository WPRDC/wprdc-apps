"use client";
import { ListBoxItem, type ListBoxItemProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function ComboBoxItem(props: ListBoxItemProps): React.ReactElement {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        twMerge("", isFocused && "focused", isSelected && "selected")
      }
    />
  );
}
