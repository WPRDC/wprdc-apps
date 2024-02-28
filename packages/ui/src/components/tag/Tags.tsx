/**
 *
 * Tags
 *
 * Collection of Tags
 *
 */

import { twMerge } from "tailwind-merge";
import { Tag } from "./Tag";
import type { TagsProps } from "./Tag.types";

export function Tags({
  tags,
  size = "M",
  className,
  tagClassName,
  children,
}: TagsProps): React.ReactElement {
  return (
    <ul
      className={twMerge(
        "space-x-2",
        ["S", "M"].includes(size) && "px-1.5 py-1",
        size === "L" && "px-2.5 py-2",
        className,
      )}
    >
      {!!tags &&
        tags.map((tag) => (
          <Tag className={tagClassName} key={tag.id} size={size}>
            {tag.label}
          </Tag>
        ))}

      {!tags && children}
    </ul>
  );
}
