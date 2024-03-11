/**
 *
 * Tabs
 *
 * Tab list
 *
 */
"use client";

import { Tabs as RATabs } from "react-aria-components";
import type { TabsProps } from "./Tabs.types";

export function Tabs(props: TabsProps): React.ReactElement {
  return <RATabs {...props} />;
}
