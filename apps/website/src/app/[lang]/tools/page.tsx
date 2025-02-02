import { Breadcrumbs } from "@/components/breadcrumbs";
import { CardGrid } from "@/components/card-grid";
import { Card } from "@/components/card";
import {
  Container,
  HeroPanel,
  MainPanel,
  PageLayout,
} from "@/components/page-layout";
import { Title } from "@/components/title";
import { getTools } from "@wprdc/api";
import { Metadata } from "next";
import React from "react";
import { Subtitle } from "@/components/subtitle";

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "WPRDC | Tools",
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "";

export default async function ToolListingRoute({ params }: Props) {
  const { data: tools } = await getTools();

  const path = [
    {
      id: "1",
      label: "Home",
      href: "/",
    },
    {
      id: "2",
      label: "Tools",
      href: "/tools",
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
            <Title>Tools</Title>
            <Subtitle>Different ways to work with data</Subtitle>
          </MainPanel>
        </Container>
      </HeroPanel>
      {/* todo: setup leading content */}
      <Container solo>
        <CardGrid>
          {tools.map(({ id, ...tool }) => (
            <Card
              key={id}
              href={`/tools/${tool.slug}`}
              title={tool.title ?? ""}
              subtitle={tool.subtitle}
              thumbnailURL={`${STRAPI_URL}${tool.thumbnail?.url}`}
            />
          ))}
        </CardGrid>
      </Container>
    </PageLayout>
  );
}
