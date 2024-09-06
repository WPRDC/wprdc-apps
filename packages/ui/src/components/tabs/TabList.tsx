"use client";

import { TabList as RATabList } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { TabListProps } from "./Tabs.types";

export function TabList<T extends object = object>({
  className,
  ...props
}: TabListProps<T>): React.ReactElement {
  return (
    <RATabList<T>
      {...props}
      className={twMerge(
        "flex flex-shrink-0 orientation-vertical:flex-col",
        className,
      )}
    />
  );
}
