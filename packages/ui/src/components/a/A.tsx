/**
 *
 * A
 *
 * Anchor element for links
 *
 **/
"use client";
import { Link } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { TbExternalLink } from "react-icons/tb";
import type { AProps } from "./A.types";

export function A({
  href = "",
  children,
  className,
  ...props
}: AProps): React.ReactElement {
  const isExternalLink = href.startsWith("http") || href.startsWith("https:");
  const link = (
    <Link
      className={twMerge(
        "inline font-semibold underline hover:bg-primary",
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );

  if (isExternalLink) {
    return (
      <div>
        {link}
        <TbExternalLink className="inline size-2.5" />
      </div>
    );
  }
  return link;
}
