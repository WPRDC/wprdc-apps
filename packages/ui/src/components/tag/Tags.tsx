/**
 *
 * Tags
 *
 * Collection of Tags
 *
 */
import * as React from "react";
import classNames from "classnames";
import { Tag } from "./Tag";
import type { TagsProps } from "./Tag.types.ts";

export function Tags({
  tags,
  size = "M",
  children,
}: TagsProps): React.ReactElement {
  return (
    <ul
      className={classNames("space-x-2", {
        "px-1.5 py-1 ": size === "S",
        "px-2.5 py-2": ["M", "L"].includes(size),
      })}
    >
      {!!tags &&
        tags.map((tag) => <Tag key={tag.id} label={tag.label} size={size} />)}

      {!tags && children}
    </ul>
  );
}
