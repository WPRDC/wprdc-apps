/**
 *
 * Navbar
 *
 * Header with navigation menu
 *
 **/
"use client";

import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { FaChevronUp } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { twMerge } from "tailwind-merge";
import { Logo } from "./Logo";
import type { NavbarProps } from "./Navbar.types";

export function Navbar({
  logoSrc,
  darkLogoSrc,
  logoProps,
  logoComponent,
  projectTitle,
  children,
  fullWidth = false,
}: NavbarProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  function closeMenu(): void {
    setIsOpen(false);
  }

  useEffect(() => {
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
    <div className="top-0 z-50 w-full dark:text-gray-100" ref={ref}>
      {/* Navbar */}
      <div className="w-full border-b-2 border-black bg-white dark:border-slate-800 dark:bg-black lg:flex ">
        <div
          className={twMerge(
            "mx-auto w-full lg:flex lg:items-center lg:justify-between",
            fullWidth ? "" : "max-w-7xl ",
          )}
        >
          <div className="flex w-full justify-between p-4 lg:w-fit">
            <div>
              <Logo
                component={logoComponent}
                darkSrc={darkLogoSrc}
                imageProps={logoProps}
                src={logoSrc}
              />
              <div className="mt-2">{projectTitle}</div>
            </div>
            <button
              aria-hidden
              className={classNames("p-2 lg:hidden")}
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
          <nav className="flex-grow">{children}</nav>
        </div>
      </div>
    </div>
  );
}
