/**
 *
 * Navbar types
 *
 **/
import type { ImageProps } from "next/image";
import type Image from "next/image";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { ReactNode } from "react";

type Source = (string | undefined) & (string | StaticImport);
type ImageComponent = typeof Image | "img";

export type LogoImageProps = Partial<Omit<ImageProps, "src">>;

export interface NavbarProps {
  logoSrc: Source;
  darkLogoSrc: Source;
  logoProps?: LogoImageProps;
  logoComponent?: ImageComponent;
  menuItems?: object[];
  projectTitle?: ReactNode;
  fullWidth?: boolean;
  children?: ReactNode;
}

export interface LogoProps {
  src: Source;
  darkSrc?: Source;
  component?: ImageComponent;
  imageProps?: LogoImageProps;
}
