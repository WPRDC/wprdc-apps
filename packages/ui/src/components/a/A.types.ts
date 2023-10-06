/**
 *
 * A types
 *
 **/
import type { UrlObject } from "node:url";
import type { LinkProps } from "next/link";
import type { PropsWithChildren } from "react";
import type { SizeCategory } from "../../types";

export interface AProps extends PropsWithChildren<Omit<LinkProps, "href">> {
  href?: string | (string & UrlObject);
  variant?: "default" | "button" | "unstyled";
  buttonStyle?: "default" | "primary" | "borderless" | "success";
  buttonSize?: SizeCategory;
  external?: boolean;
  newTab?: boolean;
  className?: string;
}
