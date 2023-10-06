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
import type { AProps } from "./A.types.ts";

export function A(props: AProps): React.ReactElement {
  const {
    href = "",
    children,
    variant,
    buttonStyle,
    buttonSize = "M",
    newTab = false,
    external = false,
    className,
    shallow,
    replace,
  } = props;

  const Component: "a" | typeof Link = external ? "a" : Link;
  return (
    <Component
      className={
        variant !== "unstyled"
          ? classNames(
              "font-bold",
              variant === "button"
                ? "inline-block border border-black uppercase decoration-2 shadow-md hover:shadow-xl active:shadow dark:border-gray-300"
                : "focus:bg-primary hover:bg-primary hover:text-text underline decoration-2",
              variant === "button" &&
                buttonStyle === "primary" &&
                "bg-primary text-text border-text dark:border-text border-2",
              {
                "px-2 py-1 text-sm": variant === "button" && buttonSize === "S",
                "px-6 py-2":
                  variant === "button" && ["M", "L"].includes(buttonSize),
              },
              className,
            )
          : className
      }
      href={href}
      rel="noreferrer"
      replace={replace}
      shallow={shallow}
      target={newTab ? "_blank" : ""}
    >
      {children}
      {external ? <HiExternalLink className="inline-block text-sm" /> : null}
    </Component>
  );
}
