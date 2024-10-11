import { Metadata } from "next";
import React from "react";
import {
  Container,
  HeroPanel,
  MainPanel,
  PageLayout,
} from "@/components/page-layout.tsx";
import { Title } from "@/components/title.tsx";
import { Breadcrumbs } from "@/components/breadcrumbs.tsx";
import { CardGrid } from "@/components/card-grid.tsx";
import { Card } from "@/components/card.tsx";
import { getArtifacts } from "@wprdc/api";

type Props = {
  params: {
    lang: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "WPRDC | Talks and Publications",
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "";

export default async function ToolListingRoute({ params }: Props) {
  const { data: artifacts } = await getArtifacts();

  const path = [
    {
      id: "1",
      label: "Home",
      href: "/",
    },
    {
      id: "2",
      label: "Talks and Publications",
      href: "#",
    },
  ];

  return (
    <PageLayout>
      <Container solo>
        <Breadcrumbs path={path} />
      </Container>
      <HeroPanel>
        <Container solo>
          <MainPanel solo>
            <Title>Talks and Publications</Title>
          </MainPanel>
        </Container>
      </HeroPanel>
      {/* todo: set up leading content */}
      <Container solo>
        <CardGrid>
          {artifacts?.map(({ id, ...artifact }) => (
            <Card
              key={id}
              href={`/talks-and-publications/${artifact.slug}`}
              title={artifact.title ?? ""}
              subtitle={artifact.subtitle}
              thumbnailURL={`${STRAPI_URL}${artifact.primaryImage?.url}`}
            />
          ))}
        </CardGrid>
      </Container>
    </PageLayout>
  );
}
