/**
 *
 * Image
 *
 * Renders pictorial media
 *
 **/

import NextImage from "next/image";
import type { ImageProps } from "./Image.types";

export function Image({
  alt,
  next: usingNextJS,
  ...props
}: ImageProps): React.ReactElement | null {
  if (usingNextJS) return <NextImage alt={alt} {...props} />;

  return <img alt={alt} {...props} />;
}
