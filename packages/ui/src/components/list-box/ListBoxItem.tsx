/**
 *
 * ListBox
 *
 * Display options to be selected.
 *
 **/
"use client";

import { ListBoxItem as RAListBoxItem } from "react-aria-components";
import type { ListBoxItemProps } from "./ListBox.types";

export function ListBoxItem<T extends object = object>(
  props: ListBoxItemProps<T>,
): React.ReactElement {
  return <RAListBoxItem {...props} />;
}
