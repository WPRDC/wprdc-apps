/**
 *
 * Tabs types
 *
 **/
import type {
  AriaTabListProps,
  AriaTabPanelProps,
  AriaTabProps,
} from "@react-types/tabs";
import type { Node } from "@react-types/shared";
import type { TabListState } from "react-stately";
import type { Resource } from "../../types";

export type TabsProps<T extends Resource> = AriaTabListProps<T>;

export interface TabProps<T extends object> extends AriaTabProps {
  item: Node<T>;
  state: TabListState<T>;
}

export interface TabPanelProps<T extends object> extends AriaTabPanelProps {
  state: TabListState<T>;
}
