/**
 *
 * A
 *
 * Anchor element for links
 *
 **/
"use client";

import { type UrlObject } from "node:url";
import Link from "next/link";
import { TbExternalLink } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { buttonBaseStyle, buttonVariants } from "../button";
import type { AProps } from "./A.types";

function isExternalLink(href: string | UrlObject): boolean {
  const url = String(href);
  if (url.startsWith("http:") || url.startsWith("https:")) {
    // don't count other *.wprdc.org sites
    return !url.includes(".wprdc.org");
  }
  return false;
}

export function A({
  href = "",
  children,
  className,
  variant,
  buttonVariant,
  external,
  ...props
}: AProps): React.ReactElement {
  const isExternal = external || isExternalLink(href);

  const link = (
    <Link
      className={twMerge(
        variant === "button"
          ? `block w-fit ${buttonBaseStyle} ${buttonVariants[buttonVariant ?? "default"]}`
          : "inline font-semibold underline hover:bg-primary",
        className,
      )}
      href={href}
      target={isExternal ? "_blank" : undefined}
      {...props}
    >
      {children}
    </Link>
  );

  if (isExternal &&  variant !== "button") {
    return (
      <span>
        <span className="">{link}</span>
        <TbExternalLink className="inline-block text-xs" />
      </span>
    );
  }

  return link;
}
