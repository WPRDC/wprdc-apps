"use client";

import { Tab as RATab } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { TabProps } from "./Tabs.types";

export function Tab({ className, ...props }: TabProps): React.ReactElement {
  return (
    <RATab
      {...props}
      className={twMerge(
        "cursor-default rounded-t border-b-2 border-b-transparent px-3 py-0.5 font-mono text-lg font-semibold ring-blue-700 focus-visible:ring selected:border-stone-800 selected:bg-wprdc-200",
        className,
      )}
    />
  );
}
