import { getStrapiMedia } from "@wprdc/api";
import { IElementsLink, IElementsLogo } from "@wprdc/types";
import { A } from "@wprdc/ui";
import React from "react";
import Logo from "./logo.tsx";

export interface FooterProps {
  links: Array<IElementsLink>;
  logoURL: string | null;
  darkLogoURL: string | null;
  affiliateLogos?: IElementsLogo[];
}

export default function Footer({
  links,
  logoURL,
  darkLogoURL,
  affiliateLogos = [],
}: FooterProps) {
  return (
    <footer className="border-textSecondary border-t-2 bg-white px-6 pb-16 pt-10 dark:bg-black">
      <div className="container mx-auto max-w-screen-xl space-y-4 lg:flex ">
        <nav className="">
          <ul className="">
            <li>
              <Logo lightModeURL={logoURL} darkModeURL={darkLogoURL} />
            </li>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {links.map((link) => (
                <li>
                  <A
                    key={link.id}
                    href={link.url ?? "#"}
                    className="font-normal"
                  >
                    {link.label}
                  </A>
                </li>
              ))}
            </div>
          </ul>
        </nav>

        <div className="flex-grow"></div>

        <div className="space-x-2">
          {affiliateLogos.map((logo) => {
            const darkURL = getStrapiMedia(logo?.image?.data?.url ?? "");
            const lightURL = getStrapiMedia(logo?.darkImage?.data?.url ?? "");
            return (
              <Logo
                key={logo.id}
                alt={logo?.altText ?? ""}
                darkModeURL={darkURL}
                lightModeURL={lightURL}
                height={100}
                width={200}
              />
            );
          })}
          <a href="https://aws.amazon.com/what-is-cloud-computing">
            <img
              className="hidden w-40 dark:block"
              src="https://d0.awsstatic.com/logos/powered-by-aws-white.png"
              alt="Powered by AWS Cloud Computing"
            />
            <img
              className="block w-40 dark:hidden"
              src="https://d0.awsstatic.com/logos/powered-by-aws.png"
              alt="Powered by AWS Cloud Computing"
            />
          </a>
          <div className="max-w-sm pt-1.5 text-xs">
            Support for Health Equity datasets and tools provided by{" "}
            <A href="https://aws.amazon.com/">Amazon Web Services (AWS)</A>{" "}
            through their{" "}
            <A href="https://aws.amazon.com/government-education/nonprofits/global-social-impact/health-equity/">
              Health Equity Initiative
            </A>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}
