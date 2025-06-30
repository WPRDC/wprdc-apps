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
import { FaX } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { twMerge } from "tailwind-merge";
import { Logo } from "./Logo";
import type { NavbarProps } from "./Navbar.types";
import { Button } from "react-aria-components";
import { TbX } from "react-icons/tb";

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
      <div className="w-full border-b-2 border-black bg-white dark:border-slate-800 dark:bg-black lg:flex">
        <div
          className={twMerge(
            "mx-auto w-full lg:flex lg:items-center lg:justify-between",
            fullWidth ? "" : "max-w-7xl",
          )}
        >
          <div className="flex w-full py-4 max-lg:pl-2 max-lg:pr-4 lg:w-fit lg:p-4">

            <Button
              aria-hidden
              className="mr-4 flex flex-col px-2 lg:hidden"
              onPress={() => {
                setIsOpen(!isOpen);
              }}
              type="button"
            >
              <GiHamburgerMenu
                className={classNames("size-10", isOpen ? "hidden" : "block")}
              />
              <TbX
                className={classNames("size-10", isOpen ? "block" : "hidden")}
              />
              <div className="text-sm font-bold uppercase">Menu</div>
            </Button>

            <div>
              <Logo
                component={logoComponent}
                darkSrc={darkLogoSrc}
                imageProps={logoProps}
                src={logoSrc}
              />

              <div className="mt-2">{projectTitle}</div>
            </div>
          </div>

          <nav
            className={twMerge(
              "w-full flex-grow overflow-hidden bg-white",
              isOpen ? "max-lg:absolute lg:block max-lg:border-b-4 border-b-black" : "max-lg:hidden lg:block",
            )}
          >
            {children}
          </nav>
        </div>
      </div>
    </div>
  );
}
