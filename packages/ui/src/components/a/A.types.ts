/**
 *
 * A types
 *
 **/

import { LinkProps as InternalLinkProps } from "next/link";
import React from "react";
import { ButtonVariant } from "../button";

export type AnchorVariant = "default" | "button" | "unstyled";

type LinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof InternalLinkProps
> &
  InternalLinkProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement>;

export interface AProps extends LinkProps {
  className?: string;
  variant?: AnchorVariant;
  buttonVariant?: ButtonVariant;
  external?: boolean;
}
