import type { Metadata } from "next";
// eslint-disable-next-line camelcase -- case from Next/font
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@wprdc/ui/styles.css";
import { Navbar } from "@wprdc/ui";
import { TbCompass, TbDownload } from "react-icons/tb";

export const metadata: Metadata = {
  title: "Parcels N'at",
  description: "Quickly download parcel data from the WPRDC",
  keywords: ["open data", "civic", "property", "real estate", "data"],
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
      <body className="flex h-screen flex-col lg:overflow-hidden">
        <Navbar
          darkLogoSrc="/wprdc-mark-dark.png"
          fullWidth
          logoSrc="/wprdc-mark-light.png"
          projectTitle={
            <div className="bg-primary w-fit rounded-sm border border-stone-400 px-1.5 py-0 font-mono text-lg font-black">
              Parcels n&apos;at
            </div>
          }
        >
          <div className="flex space-x-4 px-8 text-xl font-semibold leading-none">
            <a
              className="hover:bg-primary flex items-center hover:underline"
              href="/explore"
            >
              <TbCompass /> Explorer
            </a>
            <a
              className="hover:bg-primary flex items-center hover:underline"
              href="/bulk"
            >
              <TbDownload /> Bulk&nbsp;Download
            </a>
          </div>
        </Navbar>
        <main className="lg:flex lg:h-full lg:overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
