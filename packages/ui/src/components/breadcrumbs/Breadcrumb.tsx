import { Breadcrumb as RABreadcrumb } from "react-aria-components";
import type { BreadCrumbProps } from "./Breadcrumbs.types";

export function Breadcrumb(props: BreadCrumbProps): React.ReactElement {
  return <RABreadcrumb {...props}>{props.children}</RABreadcrumb>;
}
