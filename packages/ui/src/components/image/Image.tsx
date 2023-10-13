/**
 *
 * Image
 *
 * Renders pictorial media
 *
 **/
import * as React from "react";
import NextImage from "next/image";
import { useProvider } from "../provider";
import type { ImageProps } from "./Image.types.ts";

export function Image({
  alt,
  ...props
}: ImageProps): React.ReactElement | null {
  const { usingNextJS = false } = useProvider();

  if (usingNextJS) return <NextImage alt={alt} {...props} />;

  return <img alt={alt} {...props} />;
}
