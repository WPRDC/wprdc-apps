/**
 *
 * Image types
 *
 **/
import type { ImageProps as NextImageProps } from "next/image";
import type { Ref } from "react";

export type ImageProps = NextImageProps & {
  ref?: Ref<HTMLImageElement>;
};
