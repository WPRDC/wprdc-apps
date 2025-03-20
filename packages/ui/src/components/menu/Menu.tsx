/**
 *
 * Menu
 *
 * List of menu options
 *
 */
"use client";

import { Menu as RAMenu } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { MenuProps } from "./Menu.types.ts";

export function Menu<T extends object>({
  children,
  className,
  ...props
}: MenuProps<T>): React.ReactElement {
  return (
    <RAMenu<T>
      {...props}
      className={twMerge(
        "w-full bg-backgroundSecondary px-2 py-1 outline-0 dark:border-borderDark dark:bg-backgroundSecondaryDark dark:text-white",
        className,
      )}
    >
      {children}
    </RAMenu>
  );
}
