/**
 *
 * MenuItem
 *
 * Item within a menu
 *
 */
"use client";

import { MenuItem as RAMenuItem } from "react-aria-components";
import type { MenuItemProps } from "./Menu.types";
import { twMerge } from "tailwind-merge";

export function MenuItem<T extends object>(
  props: MenuItemProps<T>,
): React.ReactElement {
  return (
    <RAMenuItem
      {...props}
      className={
        twMerge("cursor-pointer px-2 py-1 outline-0 focus:bg-primary focus:font-medium focus:text-text", props.className)
      }
    >
      {props.children}
    </RAMenuItem>
  );
}
