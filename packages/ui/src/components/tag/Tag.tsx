/**
 *
 * Tag
 *
 *  Little bit of metadata.
 *
 */
import type { Size } from "@wprdc/types";
import { twMerge } from "tailwind-merge";
import type { TagProps } from "./Tag.types";

export function Tag({
  children,
  size = "M",
  className,
}: TagProps): React.ReactElement {
  const smallSizes: Size[] = ["S", "M"];

  return (
    <li
      className={twMerge(
        "inline-block w-fit cursor-pointer font-mono hover:bg-primary dark:border-textDark",
        "rounded border border-black bg-gray-100 font-bold",
        "uppercase shadow-none active:bg-white hover:text-black hover:shadow-sm",
        "active:shadow-inner dark:bg-black dark:active:border-primary",
        smallSizes.includes(size) && "px-1 py-0.5 text-xs",
        size === "L" && "px-2 py-1.5 text-sm",
        className,
      )}
    >
      {children}
    </li>
  );
}
