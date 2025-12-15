"use client";

import { Tab as RATab } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { TabProps } from "./Tabs.types";

export function Tab({
  className,
  children,
  ...props
}: TabProps): React.ReactElement {
  return (
    <RATab
      {...props}
      className={twMerge(
        "data-selected:bg-wprdc-200 data-selected:hover:bg-wprdc-300 flex cursor-default items-end rounded-t border-b-transparent px-2 py-0.5 text-sm font-semibold ring-blue-700 hover:bg-stone-200 focus-visible:ring data-selected:border data-selected:border-b-2 data-selected:border-stone-400 data-selected:border-b-stone-800",
        className,
      )}
    >
      {children}
    </RATab>
  );
}
