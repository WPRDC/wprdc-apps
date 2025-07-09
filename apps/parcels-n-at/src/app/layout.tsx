import type { Metadata } from "next";
// eslint-disable-next-line camelcase -- case from Next/font
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@wprdc/ui/styles.css";
import { Navbar } from "@wprdc/ui";
import { TbCompass, TbMathFunction, TbPackage } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import Script from "next/script";

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
      <Script>{`
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
      <body className="flex h-screen flex-col overflow-auto xl:overflow-hidden">
        <Navbar
          darkLogoSrc="/wprdc-mark-dark.png"
          fullWidth
          logoSrc="/wprdc-mark-light.png"
          projectTitle={
            <div className="bg-primary w-fit rounded-sm border border-stone-400 px-1.5 py-0 font-mono text-lg font-black">
              Parcels N&apos;at
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
              <TbCompass /> <span>Explorer</span>
            </a>
            <a
              className="hover:bg-primary flex items-center space-x-0.5 hover:underline"
              href="/bulk"
            >
              <TbPackage /> <span>Bulk&nbsp;Downloader</span>
            </a>
            <a
              className="hover:bg-primary flex items-center space-x-0.5 hover:underline"
              href="/indicators?maps=assessments&geog=hood&variant=_default_&question=countytotal&stat=median&mapset=assessments"
            >
              <TbMathFunction /> <span>Indicators</span>
            </a>
          </div>
        </Navbar>
        <main className="h-full xl:flex xl:overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
