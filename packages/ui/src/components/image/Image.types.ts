/**
 *
 * Image types
 *
 **/
import type { ImageProps as NextImageProps } from "next/image";
import type { DetailedHTMLProps, ImgHTMLAttributes, Ref } from "react";

type ImgProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export type ImageProps = NextImageProps & {
  ref?: Ref<HTMLImageElement>;
};
