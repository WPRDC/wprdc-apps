import type { Metadata } from "next";
// eslint-disable-next-line camelcase -- case from Next/font
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@wprdc/ui/styles.css";
import { Navbar } from "@wprdc/ui";

export const metadata: Metadata = {
  title: "Parcels N'at",
  description: "Quickly download parcel data from the WPRDC",
  keywords: ["open data", "civic", "property", "real estate", "data"],
  publisher: "Western Pennsylvania Regional Data Center",,
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
        />
        <main className="lg:flex lg:h-full lg:overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
