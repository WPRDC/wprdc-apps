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

export function Tag({ label, size = "M" }: TagProps): React.ReactElement {
  return (
    <li
      className={classNames(
        "hover:bg-primary dark:border-textDark inline-block w-fit cursor-pointer " +
          "rounded border border-black bg-gray-100 text-sm font-semibold " +
          "uppercase shadow-none hover:text-black hover:shadow-sm active:bg-white " +
          "dark:active:border-primary active:shadow-inner dark:bg-black",
        {
          "px-1.5 py-1 text-xs ": size === "S",
          "px-2 py-1.5 text-sm": ["M", "L"].includes(size),
        },
      )}
    >
      {label}
    </li>
  );
}
