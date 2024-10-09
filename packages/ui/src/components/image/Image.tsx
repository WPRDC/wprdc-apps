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
  ...props
}: ImageProps): React.ReactElement | null {
  return <NextImage alt={alt} {...props} />;
}
