import type { PropsWithChildren } from "react";

/**
 *
 * Card types
 *
 **/
export interface CardProps extends PropsWithChildren {
  href: string;
  title: string;
  subtitle?: string | null;
  thumbnailSrc?: string | null;
  thumbnailAltText?: string | null;
}
