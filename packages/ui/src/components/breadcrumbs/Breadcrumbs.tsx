/**
 * Breadcrumbs
 *
 * Like Hansel and Gretel.
 */
"use client";

import { Breadcrumbs as RABreadcrumbs } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { BreadcrumbsProps } from "./Breadcrumbs.types";

export function Breadcrumbs<T extends object = object>({
  className,
  ...props
}: BreadcrumbsProps<T>): React.ReactElement {
  return (
    <RABreadcrumbs<T>
      {...props}
      className={twMerge("flex font-mono text-sm", className)}
    />
  );
}
