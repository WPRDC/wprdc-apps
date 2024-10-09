import { Blurb } from "@/components/blurb";
import { PageLayout } from "@/components/page-layout.tsx";
import SearchBar from "@/components/search-bar.tsx";
import { STRAPI_URL } from "@/lib/constants";
import { getHomePage } from "@wprdc/api";
import { A } from "@wprdc/ui";
import Image from "next/image";
import React from "react";

export default async function HomePage() {
  const homepageResponse = await getHomePage();
  const { searchSection, blurbs, publishers } = homepageResponse.data;
  const buttons = searchSection?.buttons ?? [];
  const tiles = blurbs?.tiles ?? [];
  const partners = publishers?.partners ?? [];
  const otherPublishers = publishers?.publishers ?? [];

  return (
    <PageLayout>
      <div className="max-w-screen-lg mx-auto px-4 pt-12">
        <div className="md:mt-6 lg:mt-8">
          <h2
            className="mb-5 text-2xl font-bold leading-tight md:text-3xl lg:text-5xl"
            id="search-label"
          >
            {searchSection?.title}
          </h2>

          <SearchBar
            aria-labelledby="search-label"
            placeholder="Search for data"
          />
          <p className="my-8 py-2 leading-relaxed md:leading-relaxed lg:leading-relaxed font-sans text-lg md:text-xl lg:text-2xl">
            {searchSection?.description}
          </p>
          <div className="mt-4">
            {buttons.map((button) => (
              <A
                key={button.id}
                href={button.buttonUrl ?? "#"}
                variant="button"
                buttonVariant={button.highlight ? "primary" : "default"}
                className="mb-6 mr-6 px-3.5 inline-block rounded-sm text-lg py-1"
              >
                {button.buttonText}
              </A>
            ))}
          </div>
        </div>

        {/*Blurbs*/}
        <nav
          className="border-text my-4 grid grid-cols-1 gap-x-8 gap-y-8 border-y-2 py-8 dark:border-gray-700 md:grid-cols-2 lg:grid-cols-3"
          aria-label="site content"
        >
          {tiles.map((tile) => (
            <Blurb key={tile.id} {...tile} />
          ))}
        </nav>

        {/* Partners */}
        <div className="py-10">
          <h2 className="text-center text-3xl font-bold">
            {publishers?.header}
          </h2>
          <div className="my-6 text-center text-lg">
            {publishers?.description}
          </div>

          <div className="py-4">
            <div className="mx-auto grid w-fit grid-cols-3 gap-4 pb-4 pt-2">
              {partners.map((partner) => (
                <Image
                  key={partner.id}
                  src={
                    partner.partnerLogo?.url
                      ? `${STRAPI_URL}${partner.partnerLogo?.url}`
                      : ""
                  }
                  width={180}
                  height={180}
                  style={{ width: "180px", height: "auto" }}
                  alt={partner.partnerName ?? ""}
                />
              ))}
            </div>

            <div className="mx-auto grid w-fit grid-cols-3 items-center gap-4 py-2 sm:grid-cols-4 lg:grid-cols-6">
              {otherPublishers.map((publisher) => (
                <Image
                  key={publisher.id}
                  src={
                    publisher.partnerLogo?.url
                      ? `${STRAPI_URL}${publisher.partnerLogo?.url}`
                      : ""
                  }
                  width={140}
                  height={140}
                  style={{ width: "auto", height: "auto" }}
                  alt={publisher.partnerName ?? ""}
                />
              ))}
            </div>
          </div>

          <div className="mx-auto w-fit items-center py-4 text-xl font-bold lg:flex">
            <div className="text-center lg:text-start">
              {publishers?.callToActionText}
            </div>
            <div className="w-full pt-2 text-center lg:inline-block lg:w-fit lg:pt-0">
              <A
                variant="button"
                buttonVariant="primary"
                href={publishers?.button.buttonUrl ?? "#"}
                className="lg:ml-8"
              >
                {publishers?.button?.buttonText}
              </A>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
