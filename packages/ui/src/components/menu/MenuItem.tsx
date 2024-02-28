/**
 *
 * MenuItem
 *
 * Item within a menu
 *
 */
import { MenuItem as RAMenuItem } from "react-aria-components";
import type { MenuItemProps } from "./Menu.types";

export function MenuItem<T extends object>(
  props: MenuItemProps<T>,
): React.ReactElement {
  return (
    <RAMenuItem
      {...props}
      className="cursor-pointer px-2 py-1 outline-0 focus:bg-primary focus:font-medium focus:text-text"
    >
      {props.children}
    </RAMenuItem>
  );
}
