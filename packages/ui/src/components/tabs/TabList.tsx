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
        "orientation-vertical:flex-col flex w-full shrink-0 border-b-2 border-stone-800 px-2",
        className,
      )}
    />
  );
}
