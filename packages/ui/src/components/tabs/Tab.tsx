"use client";

import { SelectionIndicator, Tab as RATab } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { TabProps } from "./Tabs.types";

export function Tab({ className, children, ...props }: TabProps): React.ReactElement {
  return (
    <RATab
      {...props}
      className={twMerge(
        "cursor-default rounded-t border-b-2 border-b-transparent px-3 py-0.5 text-xs font-semibold ring-blue-700 focus-visible:ring data-[selected]:border-stone-800 data-[selected]:bg-wprdc-200 flex items-end",
        className,
      )}
    >
      {children}
    </RATab>
  );
}
