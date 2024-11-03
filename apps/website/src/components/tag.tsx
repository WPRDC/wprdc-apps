import { CMSTag, Size } from "@wprdc/types";
import classNames from "classnames";

export interface TagProps {
  tag: CMSTag;
  size?: Size;
}

export function Tag({ tag, size = "M" }: TagProps) {
  return (
    <li
      className={classNames(
        "hover:bg-primary dark:border-textDark inline-block w-fit cursor-pointer " +
          "rounded border border-black bg-gray-100 text-sm font-semibold" +
          "uppercase shadow-none hover:text-black hover:shadow-sm active:bg-white" +
          "dark:active:border-primary active:shadow-inner dark:bg-black",
        {
          "px-1 py-0.5 text-xs uppercase": size === "S",
          "px-2 py-1.5 text-sm": ["M", "L"].includes(size),
        },
      )}
    >
      {tag.tag}
    </li>
  );
}
