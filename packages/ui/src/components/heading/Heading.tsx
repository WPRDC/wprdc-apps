/**
 *
 * Heading
 *
 * Section heading
 *
 */
import * as React from "react";
import type { HeadingProps } from "./Heading.types.ts";
import IntrinsicElements = React.JSX.IntrinsicElements;

export function Heading({ level, ...rest }: HeadingProps): React.ReactElement {
  const HeadingElem: keyof IntrinsicElements = level
    ? (`h${level}` as keyof IntrinsicElements)
    : "div";
  return <HeadingElem {...rest} />;
}
