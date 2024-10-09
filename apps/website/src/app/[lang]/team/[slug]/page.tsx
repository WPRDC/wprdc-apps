import {
  Container,
  HeroPanel,
  MainPanel,
  PageLayout,
} from "@/components/page-layout.tsx";
import { PrimaryLink } from "@/components/primary-link.tsx";
import { Title } from "@/components/title.tsx";
import { getContentBySlug } from "@wprdc/api";
import { CMSAuthor } from "@wprdc/types";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "WPRDC | Team",
  };
}

export default async function PageRoute({ params }: Props) {
  const author = await getContentBySlug<CMSAuthor>(
    "/authors",
    params.slug,
    params.lang,
  );
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
          <Content>{bio ?? ""}</Content>
        </MainPanel>
      </Container>
    </PageLayout>
  );
}