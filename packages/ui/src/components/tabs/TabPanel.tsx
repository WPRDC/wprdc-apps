import { TabPanel as RATabPanel } from "react-aria-components";
import type { TabPanelProps } from "./Tabs.types";

export function TabPanel(props: TabPanelProps): React.ReactElement {
  return <RATabPanel {...props} />;
}
