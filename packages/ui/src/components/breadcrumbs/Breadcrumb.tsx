/**
 * Breadcrumb
 *
 * A single item in a trail of breadcrumbs
 */
"use client";

import { Breadcrumb as RABreadcrumb } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { BreadCrumbProps } from "./Breadcrumbs.types";

export function Breadcrumb({
  className,
  ...props
}: BreadCrumbProps): React.ReactElement {
  return (
    <RABreadcrumb
      {...props}
      className={twMerge(
        "font-semibold after:p-2 after:content-['/'] last:after:content-none",
        className,
      )}
    >
      {props.children}
    </RABreadcrumb>
  );
}
