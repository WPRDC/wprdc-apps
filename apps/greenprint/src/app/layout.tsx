import type { Metadata } from "next";
import { JetBrains_Mono, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "@wprdc/ui/styles.css";
import Image from "next/image";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Greenprint",
  description: "",
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoCondensed.variable} ${jetbrainsMono.variable} flex h-screen flex-col overflow-auto antialiased xl:overflow-hidden`}
      >
        <header className="flex items-end border-b-2 border-black px-7 pb-2">
          <Image
            src={`${BASE_PATH}/logo_alone.png`}
            alt="Greenprint logo"
            width={90.42}
            height={128}
          />
          <div className="">
            <div className="font-condensed text-leafgreen mb-1 text-[2.4rem] uppercase">
              Greenprint
            </div>
            <div className="font-condensed text-lightgreen pb-3.5 text-[0.8rem] font-bold uppercase">
              A Project of Allegheny Land Trust and The Western Pennsylvania
              Regional Data Center
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
