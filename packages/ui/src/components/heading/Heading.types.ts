/**
 *
 * Heading types
 *
 **/
import type * as React from "react";

export interface HeadingProps extends React.JSX.IntrinsicAttributes {
  level?: HeadingLevel;
  className?: string;
  children?: React.ReactNode;
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
