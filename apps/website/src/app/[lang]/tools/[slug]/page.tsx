import { BreadcrumbItem, Breadcrumbs } from "@/components/breadcrumbs";
import {
  Container,
  HeroPanel,
  MainPanel,
  PageLayout,
  SidePanel,
} from "@/components/page-layout";
import { PrimaryLink } from "@/components/primary-link";
import { ScreenshotGrid } from "@/components/screenshot-grid";
import { Subtitle } from "@/components/subtitle";
import { Title } from "@/components/title";
import { getContentBySlug } from "@wprdc/api";
import { CMSProject } from "@wprdc/types";
import { Content } from "@wprdc/ui";
import { Metadata } from "next";
import React from "react";
import { processContent } from "@/lib/parsing";
import { Sidebar } from "@/components/sidebar";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;
  const { data: tools } = await getContentBySlug<CMSProject>(
    "/tools",
    slug,
    lang,
    "*",
  );
  return {
    title: `WPRDC | ${tools[0].title}`,
  };
}

export default async function BlogRoute({ params }: Props) {
  const { slug, lang } = await params;
  const { data: tools } = await getContentBySlug<CMSProject>(
    "/tools",
    slug,
    lang,
    "*",
  );

  // todo: handle 404 if not posts
  const { title, subtitle, description, url, githubURL, screenshots, tags } =
    tools[0];
  const path: BreadcrumbItem[] = [
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
          ></Content>
          <ScreenshotGrid screenshots={screenshots} pageTitle={title} />
        </MainPanel>
        <SidePanel>
          <Sidebar tags={tags} githubLinks={[githubURL]} />
        </SidePanel>
      </Container>
    </PageLayout>
  );
}
