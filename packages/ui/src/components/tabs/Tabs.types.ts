/**
 *
 * Tabs types
 *
 **/

import type {
  TabListProps as RATabListProps,
  TabPanelProps as RATabPanelProps,
  TabProps as RATabProps,
  TabsProps as RATabsProps,
} from "react-aria-components";
import { ReactNode } from "react";

export interface TabProps extends RATabProps {
  children?: ReactNode
  className?: string;
}
export interface TabsProps extends RATabsProps {
  className?: string;
}
export interface TabListProps<T> extends RATabListProps<T> {
  className?: string;
}
export interface TabPanelProps extends RATabPanelProps {
  className?: string;
}
