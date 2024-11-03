import { Breadcrumbs } from "@/components/breadcrumbs.tsx";
import { Listing } from "@/components/listing.tsx";
import {
  Container,
  HeroPanel,
  MainPanel,
  PageLayout,
} from "@/components/page-layout.tsx";
import { PaginationControl } from "@/components/pagination-control.tsx";
import { Title } from "@/components/title.tsx";
import { DEFAULT_PAGE_SIZE, getWeeknotes } from "@wprdc/api";
import { Metadata } from "next";
import React from "react";
import { Subtitle } from "@/components/subtitle.tsx";
import { BriefListItem } from "@/components/listing-list-item.tsx";

type Props = {
  params: Promise<{
    lang: string;
    page: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "WPRDC | Weeknotes",
    description: "Brief weekly updates from the WPRDC.",
  };
}

export default async function BlogHomeRoute({ params }: Props) {
  const { page } = await params;
  const pageNum = parseInt(page ?? 1);

  const { data: posts, meta } = await getWeeknotes(pageNum, DEFAULT_PAGE_SIZE);
  const { pageCount } = meta.pagination;

  const path = [
    {
      id: "1",
      label: "Home",
      href: "/",
    },
    {
      id: "2",
      label: "Dispatches",
      href: "/dispatches",
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
            <Title>Dispatches</Title>
            <Subtitle>Brief updates about what we&apos;ve been up to </Subtitle>
          </MainPanel>
        </Container>
      </HeroPanel>

      <Container solo>
        <MainPanel solo>
          <PaginationControl
            path="/dispatches"
            currentPage={pageNum ?? 0}
            pageCount={pageCount}
          />

          <Listing page={pageNum}>
            {posts.map((post) => (
              <BriefListItem
                key={post.id}
                basePath="/dispatches/post"
                item={post}
              />
            ))}
          </Listing>

          <PaginationControl
            path="/dispatches"
            currentPage={pageNum ?? 0}
            pageCount={pageCount}
          />
        </MainPanel>
      </Container>
    </PageLayout>
  );
}
