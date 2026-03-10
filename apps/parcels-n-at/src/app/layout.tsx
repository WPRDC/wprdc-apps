import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@wprdc/ui/styles.css";
import { Navbar } from "@wprdc/ui";
import { TbBook2, TbCompass, TbPackage } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import Script from "next/script";
import Link from "next/link";

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
    <html lang="en">
      <Script id="matomo-code">
        {`
      <!-- Matomo -->
    var _paq = window._paq = window._paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u="https://analytics.wprdc.org/";
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', '4']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
    })();
<!-- End Matomo Code -->
    `}
      </Script>
      <body
        className={`${jetbrainsMono.variable} flex h-screen flex-col overflow-auto antialiased xl:overflow-hidden`}
      >
        <Navbar
          fullWidth
          darkLogoSrc="/wprdc-mark-dark.png"
          logoSrc="/wprdc-mark-light.png"
          logoHref="https://wprdc.org"
          projectTitle={
            <Link
              href="/"
              className="bg-primary w-fit rounded-sm border border-stone-400 px-1.5 py-0 font-mono text-lg font-black text-black decoration-2 underline-offset-2 hover:underline"
            >
              Parcels N&apos;at
            </Link>
          }
        >
          <ul
            className={twMerge(
              "flex flex-col justify-end space-y-4 pb-4 pl-4 text-xl leading-none font-semibold lg:flex-row lg:space-y-0 lg:space-x-4 lg:px-8 lg:pb-0",
            )}
          >
            <li>
              <Link
                className="hover:bg-primary flex items-center space-x-0.5 hover:underline"
                href="/explore"
              >
                <TbCompass /> <span>Explorer</span>
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-primary flex items-center space-x-0.5 hover:underline"
                href="/bulk"
              >
                <TbPackage /> <span>Bulk&nbsp;Downloader</span>
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-primary flex items-center space-x-0.5 hover:underline"
                href="/about"
              >
                <TbBook2 /> <span>Learn More</span>
              </Link>
            </li>
          </ul>
        </Navbar>
        <main className="h-full xl:flex xl:overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
