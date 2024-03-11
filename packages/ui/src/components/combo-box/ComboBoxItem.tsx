"use client";
import { ListBoxItem, type ListBoxItemProps } from "react-aria-components";

export function ComboBoxItem(props: ListBoxItemProps): React.ReactElement {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        `${isFocused ? "focused" : ""} ${isSelected ? "selected" : ""}`
      }
    />
  );
}
