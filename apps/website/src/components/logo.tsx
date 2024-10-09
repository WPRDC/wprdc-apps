"use client";

import Image, { ImageProps } from "next/image";
import Link from "next/link";
import React from "react";

export interface LogoProps extends Partial<ImageProps> {
  lightModeURL: string | null;
  darkModeURL: string | null;
}

export default function Logo({
  lightModeURL,
  darkModeURL,
  height: _height,
  width: _width,
  ...imageProps
}: LogoProps) {
  const width = _width ?? 384;
  const height = _height ?? 46;

  return (
    <Link href="/">
      {
        <Image
          src={lightModeURL ?? ""}
          alt="WPRDC logo"
          width={width}
          height={height}
          className="block dark:hidden"
          style={{ width: "auto", height: height }}
          {...imageProps}
        />
      }
      {
        <Image
          src={darkModeURL ?? ""}
          alt="WPRDC logo"
          width={width}
          height={height}
          className="hidden dark:block"
          style={{ width: "auto", height: height }}
          {...imageProps}
        />
      }
    </Link>
  );
}
