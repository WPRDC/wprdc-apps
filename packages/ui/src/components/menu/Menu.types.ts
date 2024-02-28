/**
 *
 * Menu types
 *
 **/
import type {
  MenuProps as RAMenuProps,
  MenuItemProps as RAMenuItemProps,
  SectionProps as RASectionProps,
} from "react-aria-components";

export type MenuProps<T extends object> = RAMenuProps<T>;
export type MenuItemProps<T extends object = object> = RAMenuItemProps<T>;
export type MenuSectionProps<T extends object> = RASectionProps<T>;
