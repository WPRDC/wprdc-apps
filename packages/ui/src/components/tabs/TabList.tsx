"use client";

import { TabList as RATabList } from "react-aria-components";
import type { TabListProps } from "./Tabs.types";

export function TabList<T extends object = object>(
  props: TabListProps<T>,
): React.ReactElement {
  return <RATabList<T> {...props} />;
}
