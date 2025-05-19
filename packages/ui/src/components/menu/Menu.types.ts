/**
 *
 * Menu types
 *
 **/
import type {
  MenuItemProps as RAMenuItemProps,
  MenuProps as RAMenuProps,
  SectionProps as RASectionProps,
} from "react-aria-components";

export interface MenuProps<T extends object> extends RAMenuProps<T> {
  className?: string;
}

export interface MenuItemProps<T extends object = object> extends RAMenuItemProps<T>{
  className?: string;
}

export type MenuSectionProps<T extends object> = RASectionProps<T>;
