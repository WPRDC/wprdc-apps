import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import type { ImageProps } from "next/image";

export interface LogoProps extends Partial<ImageProps> {
  lightModeURL: string | null;
  darkModeURL: string | null;
}

export function Logo({
  lightModeURL,
  darkModeURL,
  ...imageProps
}: LogoProps): React.ReactElement {
  const width = imageProps.width ?? 384;
  const height = imageProps.height ?? 46;

  return (
    <Link aria-label="Back to homepage" href="/">
      <Image
        alt="logo"
        className="block dark:hidden"
        height={height}
        src={lightModeURL ?? ""}
        style={{ width: "auto", height }}
        width={width}
      />
      <Image
        alt="logo"
        className="hidden dark:block"
        height={height}
        src={darkModeURL ?? ""}
        style={{ width: "auto", height }}
        width={width}
      />
    </Link>
  );
}
