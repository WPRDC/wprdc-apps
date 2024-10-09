/**
 * Breadcrumb
 *
 * A single item in a trail of breadcrumbs
 */
"use client";

import { useMemo } from "react";
import { Breadcrumb as RABreadcrumb } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { BreadCrumbProps } from "./Breadcrumbs.types";

export function Breadcrumb({
  className,
  ...props
}: BreadCrumbProps): React.ReactElement {
  const classnameString: string | undefined = useMemo(() => {
    if (typeof className === "string") return className;
    return undefined;
  }, [className]);

  // todo: do we handle function classNames?

  return (
    <RABreadcrumb
      {...props}
      className={twMerge(
        "font-semibold after:p-2 after:content-['/'] last:after:content-none",
        classnameString,
      )}
    >
      {props.children}
    </RABreadcrumb>
  );
}
