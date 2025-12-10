"use client";

import { Tab as RATab } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { TabProps } from "./Tabs.types";

export function Tab({ className, children, ...props }: TabProps): React.ReactElement {
  return (
    <RATab
      {...props}
      className={twMerge(
        "cursor-default rounded-t border-b-2 border-b-transparent px-2 py-0.5 text-sm font-semibold ring-blue-700 focus-visible:ring data-selected:border-stone-800 data-selected:bg-wprdc-200 flex items-end hover:bg-stone-200 data-selected:hover:bg-wprdc-300",
        className,
      )}
    >
      {children}
    </RATab>
  );
}
