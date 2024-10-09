/**
 *
 * ListBox types
 *
 **/

import {
  type ListBoxItemProps as RAListBoxItemProps,
  type ListBoxProps as RAListBoxProps,
} from "react-aria-components";

export type ListBoxProps<T extends object> = RAListBoxProps<T>;

export type ListBoxItemProps<T extends object> = RAListBoxItemProps<T>;
