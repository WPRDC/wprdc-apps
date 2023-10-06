/**
 *
 * Menu types
 *
 **/
import type { Key } from "react";
import type { AriaMenuProps } from "@react-types/menu";
import type { TreeState } from "react-stately";
import type { AriaMenuItemProps, AriaMenuSectionProps } from "react-aria";
import type { Node } from "../../types";

export type MenuProps<T> = AriaMenuProps<T>;

export interface MenuSectionProps<T> extends AriaMenuSectionProps {
  section: Node<T>;
  state: TreeState<T>;
  onAction?: (key: Key) => void;
}

export interface MenuItemProps<T> extends AriaMenuItemProps {
  item: Node<T>;
  state: TreeState<T>;
  onAction?: (key: Key) => void;
}
