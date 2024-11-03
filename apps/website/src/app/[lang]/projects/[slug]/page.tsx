import { BreadcrumbItem, Breadcrumbs } from "@/components/breadcrumbs.tsx";
import {
  Container,
  HeroPanel,
  MainPanel,
  PageLayout,
} from "@/components/page-layout.tsx";
import { PrimaryLink } from "@/components/primary-link.tsx";
import { ScreenshotGrid } from "@/components/screenshot-grid.tsx";
import { Subtitle } from "@/components/subtitle.tsx";
import { Title } from "@/components/title.tsx";
import { getContentBySlug } from "@wprdc/api";
import { CMSTool } from "@wprdc/types";
import { Content } from "@wprdc/ui";
import { Metadata } from "next";
import React from "react";
import { processContent } from "@/lib/parsing.ts";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;
  const { data: projects } = await getContentBySlug<CMSTool>(
    "/projects",
    slug,
    lang,
    "*",
  );

  return {
    title: `WPRDC | ${projects[0].title}`,
  };
}

export default async function ProjectRoute({ params }: Props) {
  const { slug, lang } = await params;
  const { data: projects } = await getContentBySlug<CMSTool>(
    "/projects",
    slug,
    lang,
    "*",
  );

  // todo: handle 404 if not posts
  const { title, subtitle, description, url, screenshots, relatedPages } =
    projects[0];
  const path: BreadcrumbItem[] = [
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
    {
      id: "3",
      label: title ?? "",
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
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
            <PrimaryLink url={url} />
          </MainPanel>
        </Container>
      </HeroPanel>
      <Container solo>
        <MainPanel solo>
          <Content
            dangerouslySetInnerHTML={{
              __html: processContent(description ?? ""),
            }}
          ></Content>
          <ScreenshotGrid screenshots={screenshots} pageTitle={title} />
        </MainPanel>
      </Container>
    </PageLayout>
  );
}
