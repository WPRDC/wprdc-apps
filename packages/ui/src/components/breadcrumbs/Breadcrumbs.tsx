/**
 *
 * Breadcrumbs
 *
 * Like Hansel and Gretel.
 *
 */
import { Breadcrumbs as RABreadcrumbs } from "react-aria-components";
import type { BreadcrumbsProps } from "./Breadcrumbs.types";

export function Breadcrumbs<T extends object = object>(
  props: BreadcrumbsProps<T>,
): React.ReactElement {
  return <RABreadcrumbs<T> {...props} />;
}
