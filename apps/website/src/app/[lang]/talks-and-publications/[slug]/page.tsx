import { Metadata } from "next";
import React from "react";
import { getContentBySlug } from "@wprdc/api";
import { CMSArtifact } from "@wprdc/types";
import {
  Container,
  HeroPanel,
  MainPanel,
  PageLayout,
  SidePanel,
} from "@/components/page-layout.tsx";
import { BreadcrumbItem, Breadcrumbs } from "@/components/breadcrumbs.tsx";
import { Title } from "@/components/title.tsx";
import { Subtitle } from "@/components/subtitle.tsx";
import { PrimaryLink } from "@/components/primary-link.tsx";
import { Content } from "@wprdc/ui";
import { ScreenshotGrid } from "@/components/screenshot-grid.tsx";
import { Sidebar } from "@/components/sidebar.tsx";
import { processContent } from "@/lib/parsing.ts";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;

  const artifact = await getContentBySlug<CMSArtifact>(
    "/artifacts",
    slug,
    lang,
    "*",
  );
  return {
    title: `WPRDC | ${artifact.data[0].title}`,
  };
}

export default async function ArtifactsRoute({ params }: Props) {
  const { slug, lang } = await params;

  const artifact = await getContentBySlug<CMSArtifact>(
    "/artifacts",
    slug,
    lang,
    "*",
  );
  const { title, subtitle, description, relatedPages, url, images } =
    artifact.data[0];

  const path: BreadcrumbItem[] = [
    {
      id: "1",
      label: "Home",
      href: "/",
    },
    {
      id: "2",
      label: "Talks and Publications",
      href: "/talks-and-publications",
    },
    {
      id: "3",
      label: title ?? "",
      href: "#",
    },
  ];

  return (
    <PageLayout>
      <Container>
        <Breadcrumbs path={path} />
      </Container>

      <HeroPanel>
        <Container>
          <MainPanel>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
            <PrimaryLink url={url} />
          </MainPanel>
        </Container>
      </HeroPanel>

      <Container>
        <MainPanel>
          <Content
            dangerouslySetInnerHTML={{
              __html: processContent(description ?? ""),
            }}
          />
          <ScreenshotGrid screenshots={images} pageTitle={title} />
        </MainPanel>
        <SidePanel>
          <Sidebar relatedPages={relatedPages} />
        </SidePanel>
      </Container>
    </PageLayout>
  );
}
