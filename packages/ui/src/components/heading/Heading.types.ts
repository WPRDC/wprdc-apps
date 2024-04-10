/**
 *
 * Heading types
 *
 **/
import type * as React from "react";

export interface HeadingProps
  extends React.BaseHTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  className?: string;
  children?: React.ReactNode;
}

export const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;
export type HeadingLevel = (typeof HEADING_LEVELS)[number];
