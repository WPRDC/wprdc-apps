/**
 *
 * Tabs
 *
 * Tab list
 *
 */
"use client";

import { Tabs as RATabs } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { TabsProps } from "./Tabs.types";

export function Tabs({ className, ...props }: TabsProps): React.ReactElement {
  return <RATabs {...props} className={twMerge("", className)} />;
}
