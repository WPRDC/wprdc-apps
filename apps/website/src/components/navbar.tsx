"use client";

import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiExternalLink } from "react-icons/hi";
import Logo from "./logo";
import { Button } from "react-aria-components";
import { CMSNavMenuItem } from "@wprdc/types";

export interface NavbarProps {
  logoURL: string | null;
  darkLogoURL: string | null;
  menuItems: CMSNavMenuItem[];
}

export default function Index({
  menuItems,
  logoURL,
  darkLogoURL,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentMenuItem, setCurrentMenuItem] =
    useState<CMSNavMenuItem | null>();

  const ref = useRef<HTMLDivElement>(null);

  function closeMenu() {
    setIsOpen(false);
    setCurrentMenuItem(null);
  }

  const handleMenuClick = (menuItem: CMSNavMenuItem) => () => {
    if (!!currentMenuItem && menuItem.id === currentMenuItem.id) {
      setCurrentMenuItem(null);
    } else {
      setCurrentMenuItem(menuItem);
    }
  };


  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === "Escape") {
        closeMenu();
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={ref} className="top-0 z-50 w-full dark:text-gray-100">
      {/* Navbar */}
      <header className="w-full border-b-2 border-black bg-white px-4 lg:flex dark:border-slate-800 dark:bg-black">
        <div
          className={classNames(
            "mx-auto w-full max-w-7xl lg:flex lg:items-center lg:justify-between",
          )}
        >
          <div className="flex w-full justify-between py-4 pr-4 lg:w-fit">
            <Logo lightModeURL={logoURL} darkModeURL={darkLogoURL} />
            <Button
              className={classNames("p-2 lg:hidden")}
              type="button"
              onPress={() => setIsOpen(!isOpen)}
            >
              <GiHamburgerMenu
                className={classNames("text-2xl", isOpen ? "hidden" : "block")}
              />
              <FaChevronUp
                className={classNames("text-2xl", isOpen ? "block" : "hidden")}
              />
            </Button>
          </div>
          <nav
            aria-label="Main navigation"
            className={classNames(
              "h-fit lg:block",
              isOpen ? "block" : "hidden",
            )}
          >
            <ul className="">
              {menuItems.map((menuItem) => (
                <li
                  key={menuItem.documentId}
                  className="m-1 h-fit items-center px-1 lg:inline-block lg:border-none"
                >
                  <button
                    aria-expanded={
                      currentMenuItem?.id === menuItem.id ? "true" : "false"
                    }
                    onClick={handleMenuClick(menuItem)}
                    className="dark:hover:text-primary dark:hover:bg-background-dark dark:ring-text-secondary-dark ring-text-secondary flex h-full w-full items-center rounded-sm px-2 py-4 hover:font-black hover:ring-1 md:py-2 lg:h-fit lg:w-fit"
                  >
                    {menuItem.primaryLink?.label}
                    {currentMenuItem?.id === menuItem.id ? (
                      <FaChevronUp className="ml-1.5 inline-block text-xs" />
                    ) : (
                      <FaChevronDown className="ml-1.5 inline-block text-xs" />
                    )}
                  </button>

                  <ul
                    className={classNames(
                      "border-text-secondary ml-4 bg-white lg:ml-0 lg:w-full lg:border-b dark:bg-black",
                      currentMenuItem?.id === menuItem.id
                        ? "lg:absolute lg:left-0 lg:m-1 lg:pt-1"
                        : "hidden",
                    )}
                  >
                    <div className="w-full py-2 lg:mx-auto lg:flex lg:max-w-5xl">
                      <div className="ml-auto w-full lg:w-5/12">
                        {menuItem.subMenu?.map((subMenuItem) => (
                          <li
                            key={subMenuItem.id}
                          >
                            <Link
                              onClick={closeMenu}
                              href={subMenuItem.link?.url ?? "#"}
                              className="hover:ring-primary dark:hover:bg-background-dark decoration-primary my-1 block p-2 hover:bg-amber-100 hover:ring-2"
                            >
                              <div className="text-lg font-semibold">
                                {subMenuItem.link?.label}
                                <span className="sr-only">:</span>
                                {subMenuItem.link?.newTab && (
                                  <HiExternalLink className="inline-block text-sm" />
                                )}
                              </div>
                              {!!subMenuItem.deatailLine && (
                                <div className="text-text-secondary dark:text-text-secondary-dark text-sm">
                                  {subMenuItem.deatailLine}
                                </div>
                              )}
                            </Link>
                            {!!subMenuItem.subItems && (
                              <ul>
                                {subMenuItem.subItems?.map((subItem) => (
                                  <li key={subItem.id} className="pl-4">
                                    <Link
                                      onClick={closeMenu}
                                      href={subItem.url ?? "#"}
                                      className="hover:ring-primary dark:hover:bg-background-dark decoration-primary my-1 block p-2 hover:bg-amber-100 hover:ring-2"
                                    >
                                      {subItem.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </div>
                    </div>
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
