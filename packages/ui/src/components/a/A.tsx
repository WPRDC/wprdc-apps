/**
 *
 * A
 *
 * Anchor element for links
 *
 **/
import * as React from "react";
import Link from "next/link";
import classNames from "classnames";
import { HiExternalLink } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { useProvider } from "../provider";
import type { AProps } from "./A.types.ts";

export function A({
  href = "",
  children,
  variant,
  external = false,
  className,
  shallow,
  replace,
  ref,
  ...props
}: AProps): React.ReactElement {
  const { usingNextJS = false } = useProvider();

  const Component: "a" | typeof Link = usingNextJS ? Link : "a";

  return (
    <Component
      className={twMerge(
        classNames(
          variant !== "unstyled" &&
            "ui-font-bold ui-text-text ui-underline ui-decoration-2 hover:ui-bg-primary " +
              "focus:ui-bg-primary dark:ui-text-textDark dark:hover:ui-text-text",
        ),
        className,
      )}
      href={href}
      ref={ref}
      replace={replace}
      shallow={shallow}
      {...props}
    >
      {children}
      {external ? (
        <HiExternalLink className="ui-inline-block ui-text-sm" />
      ) : null}
    </Component>
  );
}
