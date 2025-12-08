import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { FALLBACK_SEO } from "@/lib/constants";
import { i18n } from "@/lib/i18n-config";
import {
  getGlobal,
  getMainMenu,
  getStrapiMedia,
  getStrapiURL,
} from "@wprdc/api";
import { JetBrains_Mono, Public_Sans } from "next/font/google";
import Script from "next/script";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
});

/** Special Next.js function for assigning metadata to pages under this layout */
export async function generateMetadata(): Promise<Metadata> {
  const globalResponse = await getGlobal();
  if (!globalResponse.data) return FALLBACK_SEO;

  const { meta, data } = globalResponse;
  const { title, description } = data.metadata ?? {};
  const url = data.favicon?.url ?? "";

  return {
    title: title,
    description: description,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  const global = await getGlobal();
  const menuItems = await getMainMenu();

  if (!global.data) return null;

  const {
    navbarLogo,
    footerLogo,
    navbarLinks = [],
    affiliateLogos,
  } = global.data;

  const navbarLogoURL = getStrapiMedia(navbarLogo?.image?.url ?? "");
  const navbarDarkLogoURL = getStrapiMedia(navbarLogo?.darkImage?.url ?? "");

  const footerLogoURL = getStrapiMedia(footerLogo?.image?.url ?? "");
  const footerDarkLogoURL = getStrapiMedia(footerLogo?.darkImage?.url ?? "");

  return (
    <html>
      <Script>
        {`
          var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="https://analytics.wprdc.org/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '2']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
      `}
      </Script>
      <body
        className={`${jetbrainsMono.variable} ${publicSans.variable} flex h-screen flex-col`}
      >
        <Navbar
          logoURL={navbarLogoURL}
          darkLogoURL={navbarDarkLogoURL}
          menuItems={menuItems.data}
        />
        <div className="relative flex-grow overflow-auto">
          <main className="bg-background dark:bg-background-dark mb-16">
            {children}
          </main>
          <Footer
            logoURL={footerLogoURL}
            darkLogoURL={footerDarkLogoURL}
            links={navbarLinks}
            affiliateLogos={affiliateLogos}
          />
        </div>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
