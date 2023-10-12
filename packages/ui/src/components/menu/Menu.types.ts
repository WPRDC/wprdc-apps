/**
 *
 * Menu types
 *
 **/
import type { AriaMenuProps } from "@react-types/menu";
import type { MenuTriggerProps, TreeState } from "react-stately";
import type { Node } from "../../types";

export type MenuProps<T extends object> = AriaMenuProps<T>;
export interface MenuButtonProps<T> extends AriaMenuProps<T>, MenuTriggerProps {
  label?: string;
}

export interface MenuSectionProps<T> {
  section: Node<T>;
  state: TreeState<T>;
}

export interface MenuItemProps<T> {
  item: Node<T>;
  state: TreeState<T>;
}
