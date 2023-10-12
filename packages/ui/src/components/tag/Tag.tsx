/**
 *
 * Tag
 *
 *  Little bit of metadata.
 *
 */
import * as React from "react";
import classNames from "classnames";
import type { TagProps } from "./Tag.types.ts";

export function Tag({ children, size = "M" }: TagProps): React.ReactElement {
  return (
    <li
      className={classNames(
        "ui-inline-block ui-w-fit ui-cursor-pointer ui-font-mono hover:ui-bg-primary dark:ui-border-textDark",
        "ui-rounded ui-border ui-border-black ui-bg-gray-100 ui-font-bold",
        "ui-uppercase ui-shadow-none hover:ui-text-black hover:ui-shadow-sm active:ui-bg-white",
        "dark:ui-active:border-primary active:ui-shadow-inner dark:ui-bg-black",
        {
          "ui-px-1 ui-py-0.5 ui-text-xs ": ["S", "M"].includes(size),
          "ui-px-2 ui-py-1.5 ui-text-sm": size === "L",
        },
      )}
    >
      {children}
    </li>
  );
}
