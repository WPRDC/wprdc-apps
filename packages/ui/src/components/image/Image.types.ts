/**
 *
 * Image types
 *
 **/
import type { DetailedHTMLProps, ImgHTMLAttributes, Ref } from "react";
import type { ImageProps as NextImageProps } from "next/image";

type ImgProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export type ImageProps = (ImgProps & NextImageProps) & {
  alt: string;
  ref?: Ref<HTMLImageElement>;
};
