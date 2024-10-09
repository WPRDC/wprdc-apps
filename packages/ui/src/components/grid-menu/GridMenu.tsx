"use client";

import type { Size } from "@wprdc/types";
import classNames from "classnames";
import type { ReactElement, ReactNode } from "react";
import React, { cloneElement } from "react";
import type { MenuProps } from "react-aria-components";
import { Menu } from "react-aria-components";
import type { BigButtonMenuItemProps } from "./GridMenuItem";

export interface BigMenuProps
  extends MenuProps<{
    id: string;
  }> {
  label?: ReactNode;
  orientation?: "vertical" | "horizontal" | "grid";
  columns?: number;
  size?: Size;
}

export function GridMenu({
  label,
  orientation = "horizontal",
  columns = 3,
  size = "M",
  children,
  ...props
}: BigMenuProps): React.ReactElement {
  return (
    <div>
      <div>{label}</div>
      <Menu
        {...props}
        className={classNames("py-1", {
          "flex w-full items-center overflow-x-auto":
            orientation === "horizontal",
          "grid ": orientation === "grid",
          "grid-cols-2": columns === 2,
          "grid-cols-3": columns === 3,
          "grid-cols-4": columns === 4,
          "grid-cols-5": columns === 5,
          "grid-cols-6": columns === 6,
          "grid-cols-7": columns === 7,
          "grid-cols-8": columns === 8,
          "grid-cols-9": columns === 9,
          "grid-cols-10": columns === 10,
          "grid-cols-11": columns === 11,
          "grid-cols-12": columns === 12,
        })}
        disallowEmptySelection
        selectionMode="single"
      >
        {Array.isArray(children)
          ? (children as ReactElement<BigButtonMenuItemProps>[]).map((child) =>
              cloneElement(child, { size, key: child.props.id }),
            )
          : children}
      </Menu>
    </div>
  );
}
