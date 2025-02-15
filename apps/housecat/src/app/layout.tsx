import type { Metadata } from "next";
// eslint-disable-next-line camelcase -- case from next/font
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@wprdc/ui/styles.css";

import { A, Navbar } from "@wprdc/ui";
import {
  TbCompass,
  TbEyeExclamation,
  TbFile,
  TbMathFunction,
  TbPackage,
} from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { AuthCheck } from "@/app/auth.tsx";

export const metadata: Metadata = {
  title: "HouseCat",
  description: "Affordable housing data catalog.",
  keywords: ["open data", "civic", "affordable housing", "data"],
  publisher: "Western Pennsylvania Regional Data Center",
};

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html className={`${jetbrainsMono.variable} `} lang="en">
      <body className="flex h-screen flex-col overflow-auto xl:overflow-hidden">
        <AuthCheck />

        <Navbar
          darkLogoSrc="/wprdc-mark-dark.png"
          fullWidth
          logoSrc="/wprdc-mark-light.png"
          projectTitle={
            <div className="w-fit rounded-sm border border-stone-400 bg-indigo-300 px-1.5 py-0 font-mono text-lg font-black">
              HouseCat
            </div>
          }
        >
          <div
            className={twMerge(
              "flex flex-col justify-end space-y-4 pb-4 pl-4 text-xl font-semibold leading-none lg:flex-row lg:space-x-4 lg:space-y-0 lg:px-8 lg:pb-0",
            )}
          >
            <A
              className="hover:bg-primary flex items-center space-x-0.5 hover:underline"
              href="/explore"
            >
              <TbCompass /> <span>Explorer</span>
            </A>
            <A
              className="hover:bg-primary flex items-center space-x-0.5 hover:underline"
              href="/watchlist"
            >
              <TbEyeExclamation /> <span>Watchlists</span>
            </A>
            <Link
              className="hover:bg-primary flex items-center space-x-0.5 underline"
              target="_blank"
              href="https://parcelsnat.org/indicators?maps=assessments&geog=hood&variant=_default_&question=countytotal&stat=median&mapset=assessments"
            >
              <TbMathFunction /> <span>Indicators</span>
            </Link>
            <A
              className="hover:bg-primary flex items-center space-x-0.5 hover:underline"
              href="/terms"
            >
              <span>Terms</span>
            </A>
          </div>
        </Navbar>
        <main className="xl:flex xl:h-full xl:overflow-auto">{children}</main>
      </body>
    </html>
  );
}
