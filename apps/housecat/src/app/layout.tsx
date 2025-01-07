import type { Metadata } from "next";
// eslint-disable-next-line camelcase -- case from Next/font
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@wprdc/ui/styles.css";
import { Navbar } from "@wprdc/ui";
import { TbEyeExclamation, TbMap } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

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
            <a
              className="hover:bg-primary flex items-center space-x-0.5 hover:underline"
              href="/explore"
            >
              <TbMap /> <span>Explore</span>
            </a>
            <a
              className="hover:bg-primary flex items-center space-x-0.5 hover:underline"
              href="/watchlist"
            >
              <TbEyeExclamation /> <span>Watchlist</span>
            </a>
          </div>
        </Navbar>
        <main className="xl:flex xl:h-full xl:overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
