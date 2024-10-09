import { getContentBySlug } from "@wprdc/api";
import { Metadata } from "next";
import React from "react";
import { CMSBlog } from "@wprdc/types";
import { BreadcrumbItem, Breadcrumbs } from "@/components/breadcrumbs.tsx";
import {
  Container,
  MainPanel,
  PageLayout,
  SidePanel,
  HeroPanel,
} from "@/components/page-layout.tsx";
import { Content } from "@wprdc/ui";
import { Title } from "@/components/title.tsx";
import { Byline } from "@/components/byline.tsx";
import { Subtitle } from "@/components/subtitle.tsx";
import { Sidebar } from "@/components/sidebar.tsx";

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = params;
  const { data: posts } = await getContentBySlug<CMSBlog>(
    "/blogs",
    slug,
    lang,
    "*",
  );

  return {
    title: `WPRDC | ${posts[0].title}`,
  };
}

export default async function BlogRoute({ params }: Props) {
  const { slug, lang } = params;
  const { data: posts } = await getContentBySlug<CMSBlog>(
    "/blogs",
    slug,
    lang,
    "*",
  );

  // todo: handle 404 if not posts
  const { title, subtitle, article, author, publishedAt } = posts[0];
  const path: BreadcrumbItem[] = [
    {
      id: "1",
      label: "Home",
      href: "/",
    },
    {
      id: "2",
      label: "Blog",
      href: "/blog",
    },
    {
      id: "4",
      label: title ?? "",
      href: `/blog/post/${slug}`,
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
            <Byline author={author} timestamp={publishedAt} />
          </MainPanel>
        </Container>
      </HeroPanel>
      <Container>
        <MainPanel>
          <Sidebar className="block lg:hidden" contents={article} />
          <Content>{article}</Content>
        </MainPanel>
        <SidePanel>
          <Sidebar contents={article} />
        </SidePanel>
      </Container>
    </PageLayout>
  );
}