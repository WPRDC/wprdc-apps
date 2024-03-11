"use client";
import type { MenuItemProps } from "react-aria-components";
import { MenuItem, Text } from "react-aria-components";
import Image from "next/image";
import { TbCircleCheckFilled } from "react-icons/tb";
import classNames from "classnames";
import type { Size } from "@wprdc/types";

export interface BigButtonMenuItemProps extends MenuItemProps {
  children: string;
  image: string;
  size?: Size;
}

export function GridMenuItem({
  children,
  image,
  size = "M",
  ...props
}: BigButtonMenuItemProps): React.ReactElement {
  return (
    <MenuItem
      {...props}
      className="selected:ring-stone-800 group relative m-1 rounded-sm outline-0 ring-1 ring-transparent focus:shadow-sm focus:ring-stone-400 active:shadow-none"
    >
      <div
        className={classNames(
          "group-selected:border-stone-800 group-selected:bg-blue-50 cursor-pointer rounded-sm border-2 border-stone-400 group-focus:bg-stone-200",
          {
            "w-12": size === "S",
            "w-20": size === "M",
            "w-24": size === "L",
          },
        )}
      >
        <div
          className={classNames("relative w-full border-b border-stone-800", {
            "h-8": size === "S",
            "h-12": size === "M",
            "h-16": size === "L",
          })}
        >
          <Image
            alt=""
            aria-hidden
            className="z-10"
            fill
            objectFit="cover"
            src={image}
          />
        </div>
        <div
          className={classNames(
            "flex flex-col items-center bg-transparent px-1 py-0.5",
            {
              "px-0.5 py-0": size === "S",
            },
          )}
        >
          <Text
            className={classNames(
              "group-selected:font-stone-800 text-center text-xs font-medium uppercase",
              {
                "text-sm": size === "L",
              },
            )}
            slot="label"
          >
            {children}
          </Text>
          <TbCircleCheckFilled className="group-selected:block absolute right-2 top-2 z-10 hidden h-5 w-5 rounded-xl bg-white text-blue-600" />
        </div>
      </div>
    </MenuItem>
  );
}
