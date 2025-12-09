import {
  Container,
  HeroPanel,
  MainPanel,
  PageLayout,
} from "@/components/page-layout";
import { PrimaryLink } from "@/components/primary-link";
import { Title } from "@/components/title";
import { getContentBySlug } from "@wprdc/api";
import { CMSAuthor } from "@wprdc/types";
import { Content } from "@wprdc/ui";
import { Metadata } from "next";
import React from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { processContent } from "@/lib/parsing";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

const path = [
  {
    id: "1",
    label: "Home",
    href: "/",
  },
  {
    id: "2",
    label: "The Team",
    href: `/team`,
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "WPRDC | Team",
  };
}

export default async function PageRoute({ params }: Props) {
  const { slug, lang } = await params;

  const author = await getContentBySlug<CMSAuthor>("/authors", slug, lang);
  const { name, email, bio } = author.data[0];

  return (
    <PageLayout>
      <Container solo>
        <Breadcrumbs path={path} />
      </Container>
      <HeroPanel>
        <Container solo>
          <MainPanel solo>
            <Title>{name}</Title>
            <PrimaryLink
              url={`mailto:${email}`}
              label={email}
              external={false}
            />
          </MainPanel>
        </Container>
      </HeroPanel>
      <Container solo>
        <MainPanel solo>
          <Content
            dangerouslySetInnerHTML={{ __html: processContent(bio ?? "") }}
          ></Content>
        </MainPanel>
      </Container>
    </PageLayout>
  );
}
