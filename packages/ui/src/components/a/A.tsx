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
import type { AProps } from "./A.types.ts";

export function A(props: AProps): React.ReactElement {
  const {
    href = "",
    children,
    variant,
    newTab = false,
    external = false,
    className,
    shallow,
    replace,
    ref,
  } = props;

  const Component: "a" | typeof Link = external ? "a" : Link;
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
      rel="noreferrer"
      replace={replace}
      shallow={shallow}
      target={newTab ? "_blank" : ""}
    >
      {children}
      {external ? (
        <HiExternalLink className="ui-inline-block ui-text-sm" />
      ) : null}
    </Component>
  );
}
