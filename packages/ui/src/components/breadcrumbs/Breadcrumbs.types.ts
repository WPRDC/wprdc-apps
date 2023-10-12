/**
 *
 * Breadcrumbs types
 *
 **/
import type * as React from "react";
import type { FC, HTMLAttributes, Key, ReactNode, Ref } from "react";
import type {
  AriaBreadcrumbItemProps,
  AriaBreadcrumbsProps,
} from "@react-types/breadcrumbs";

export interface BreadcrumbsProps extends AriaBreadcrumbsProps {
  showCurrent?: boolean;
  bigTitle?: boolean;
  titleElement?: keyof React.JSX.IntrinsicElements;
  shallow?: boolean;
  children: React.ReactElement<BreadcrumbItemProps>[];
}

export interface BreadcrumbItemProps<
  T extends HTMLAnchorElement = HTMLAnchorElement,
> extends AriaBreadcrumbItemProps {
  key?: Key;
  hideDivider?: boolean;
  href?: string;
  LinkComponent?: FC<BreadcrumbItemLinkProps<T>>;
  TitleComponent?: FC<BreadcrumbItemTitleProps>;
  divider?: ReactNode;
  bigTitle?: boolean;
  shallow?: boolean;
}

export interface BreadcrumbItemLinkProps<
  T extends HTMLAnchorElement = HTMLAnchorElement,
> extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  ref?: Ref<T>;
  shallow?: boolean;
}

export interface BreadcrumbItemTitleProps<T extends HTMLElement = HTMLElement>
  extends HTMLAttributes<HTMLElement> {
  ref?: Ref<T>;
}
