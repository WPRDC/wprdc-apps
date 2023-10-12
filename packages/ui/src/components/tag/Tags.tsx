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
      className={classNames("ui-space-x-2", {
        "ui-px-1.5 ui-py-1": ["S", "M"].includes(size),
        "ui-px-2.5 ui-py-2": size === "L",
      })}
    >
      {!!tags &&
        tags.map((tag) => (
          <Tag key={tag.id} size={size}>
            {tag.label}
          </Tag>
        ))}

      {!tags && children}
    </ul>
  );
}
