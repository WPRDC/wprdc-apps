"use client";

import { TabPanel as RATabPanel } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { TabPanelProps } from "./Tabs.types";

export function TabPanel({
  className,
  ...props
}: TabPanelProps): React.ReactElement {
  return <RATabPanel {...props} className={twMerge("grow", className)} />;
}
