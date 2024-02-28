import { twMerge } from "tailwind-merge";
import { A } from "../a";
import type { LogoProps } from "./Navbar.types";

export function Logo({
  src,
  darkSrc,
  component: Component = "img",
  imageProps,
}: LogoProps): React.ReactElement {
  const width = imageProps?.width ?? 384;
  const height = imageProps?.height ?? 46;

  const _darkSrc = darkSrc ?? src;
  return (
    <A href="/">
      <Component
        alt={imageProps?.alt ?? "Site Logo"}
        className={twMerge(imageProps?.className, "block dark:hidden")}
        height={height}
        src={src}
        width={width}
      />
      <Component
        alt={imageProps?.alt ?? "Site Logo"}
        className={twMerge(imageProps?.className, "hidden dark:block")}
        height={height}
        src={_darkSrc}
        width={width}
      />
    </A>
  );
}
