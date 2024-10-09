import { Breadcrumbs } from "@/components/breadcrumbs.tsx";
import { Card } from "@/components/card";
import { CardGrid } from "@/components/card-grid.tsx";
import {
  Container,
  HeroPanel,
  MainPanel,
  PageLayout,
} from "@/components/page-layout.tsx";
import { Title } from "@/components/title.tsx";
import { getProjects } from "@wprdc/api";
import { Metadata } from "next";
import React from "react";
import { Subtitle } from "@/components/subtitle.tsx";

type Props = {
  params: {
    lang: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "WPRDC | Projects",
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "";

export default async function ToolListingRoute({ params }: Props) {
  const { data: projects } = await getProjects();

  const path = [
    {
      id: "1",
      label: "Home",
      href: "/",
    },
    {
      id: "2",
      label: "Projects",
      href: "/projects",
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
            <Title>Projects</Title>
            <Subtitle>Links to other projets we're engaged with</Subtitle>
          </MainPanel>
        </Container>
      </HeroPanel>
      {/* todo: setup leading content */}
      <Container solo>
        <CardGrid>
          {projects.map(({ id, ...project }) => (
            <Card
              key={id}
              href={`/projects/${project.slug}`}
              title={project.title ?? ""}
              subtitle={project.subtitle}
              thumbnailURL={`${STRAPI_URL}${project.thumbnail?.url}`}
            />
          ))}
        </CardGrid>
      </Container>
    </PageLayout>
  );
}
