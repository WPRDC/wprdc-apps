import { Tab as RATab } from "react-aria-components";
import type { TabProps } from "./Tabs.types";

export function Tab(props: TabProps): React.ReactElement {
  return <RATab {...props} />;
}
