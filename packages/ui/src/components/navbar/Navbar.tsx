/**
 *
 * Navbar
 *
 * Header with navigation menu
 *
 **/
import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronUp } from "react-icons/fa6";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { A } from "../a/A.tsx";
import type { LogoProps, NavbarProps } from "./Navbar.types.ts";

export function Navbar({
  logoSrc,
  darkLogoSrc,
  logoProps,
  logoComponent,
}: NavbarProps): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const ref = React.useRef<HTMLDivElement>(null);

  function closeMenu(): void {
    setIsOpen(false);
  }

  React.useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent): void {
      if (event.code === "Escape") {
        closeMenu();
      }
    }

    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeMenu();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="ui-top-0 ui-z-50 ui-w-full dark:ui-text-gray-100" ref={ref}>
      {/* Navbar */}
      <div className="ui-w-full ui-border-b-2 ui-border-black ui-bg-white dark:ui-border-slate-800 dark:ui-bg-black lg:ui-flex ">
        <div
          className={classNames(
            "ui-mx-auto ui-w-full ui-max-w-7xl lg:ui-flex lg:ui-items-center lg:ui-justify-between",
          )}
        >
          <div className="ui-flex ui-w-full ui-justify-between ui-p-4 lg:ui-w-fit">
            <Logo
              component={logoComponent}
              darkSrc={darkLogoSrc}
              imageProps={logoProps}
              src={logoSrc}
            />
            <button
              aria-hidden
              className={classNames("ui-p-2 lg:ui-hidden")}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              type="button"
            >
              <GiHamburgerMenu
                className={classNames("text-2xl", isOpen ? "hidden" : "block")}
              />
              <FaChevronUp
                className={classNames("text-2xl", isOpen ? "block" : "hidden")}
              />
            </button>
          </div>
          <nav>{/*  todo: implement nav menu props*/}</nav>
        </div>
      </div>
    </div>
  );
}

function Logo({
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
        className={twMerge(imageProps?.className, "ui-block dark:ui-hidden")}
        height={height}
        src={src}
        width={width}
      />
      <Component
        alt={imageProps?.alt ?? "Site Logo"}
        className={twMerge(imageProps?.className, "ui-hidden dark:ui-block")}
        height={height}
        src={_darkSrc}
        width={width}
      />
    </A>
  );
}
