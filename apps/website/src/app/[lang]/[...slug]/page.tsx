import {
  Container,
  HeroPanel,
  MainPanel,
  PageLayout,
} from "@/components/page-layout.tsx";
import { Subtitle } from "@/components/subtitle";
import { Title } from "@/components/title";
import { getContentBySlug } from "@wprdc/api";
import { CMSPage } from "@wprdc/types";
import { Content } from "@wprdc/ui";
import { Metadata } from "next";
import React from "react";
import { Breadcrumbs } from "@/components/breadcrumbs.tsx";

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getContentBySlug<CMSPage>(
    "/pages",
    params.slug,
    params.lang,
  );
  return {
    title: `WPRDC | ${page.data[0].title}`,
  };
}

export default async function PageRoute({ params }: Props) {
  const page = await getContentBySlug<CMSPage>(
    "/pages",
    params.slug,
    params.lang,
    "*",
  );
  const { title, subtitle, body, updatedAt, publishedAt, relatedPages } =
    page.data[0];

  const path = [
    {
      id: "1",
      label: "Home",
      href: "/",
    },
    {
      id: "2",
      label: title ?? "",
      href: `/${params.slug}`,
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
          </MainPanel>
        </Container>
      </HeroPanel>
      <Container solo>
        <MainPanel solo>
          <Content>{body}</Content>
        </MainPanel>
      </Container>
    </PageLayout>
  );
}
