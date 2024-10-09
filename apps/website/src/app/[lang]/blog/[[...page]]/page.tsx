import { Breadcrumbs } from "@/components/breadcrumbs";
import { Listing, BlogListItem } from "@/components/listing.tsx";
import {
  Container,
  HeroPanel,
  MainPanel,
  PageLayout,
} from "@/components/page-layout.tsx";
import { PaginationControl } from "@/components/pagination-control.tsx";
import { Title } from "@/components/title.tsx";
import { DEFAULT_PAGE_SIZE, getBlogPosts } from "@wprdc/api";
import { Metadata } from "next";
import React from "react";
import { Subtitle } from "@/components/subtitle.tsx";

type Props = {
  params: {
    lang: string;
    page: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "WPRDC | Blog",
    description:
      "News and updates from the folks at the Western PA Regional Data Center",
  };
}

export default async function BlogHomeRoute({ params }: Props) {
  const { page } = params;
  const pageNum = parseInt(page ?? 1);

  const { data: posts, meta } = await getBlogPosts(pageNum, DEFAULT_PAGE_SIZE);
  const { pageCount } = meta.pagination;

  const path = [
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
  ];

  return (
    <PageLayout>
      <Container solo>
        <Breadcrumbs path={path} />
      </Container>
      <HeroPanel>
        <Container solo>
          <MainPanel solo>
            <Title>Blog Posts</Title>
            <Subtitle>Writings about our work</Subtitle>
          </MainPanel>
        </Container>
      </HeroPanel>
      <Container solo>
        <MainPanel solo>
          <PaginationControl
            path="/blog"
            currentPage={pageNum ?? 0}
            pageCount={pageCount}
          />
          <Listing page={pageNum}>
            {posts.map((post) => (
              <BlogListItem key={post.id} basePath="/blog/post" item={post} />
            ))}
          </Listing>
          <PaginationControl
            path="/blog"
            currentPage={pageNum ?? 0}
            pageCount={pageCount}
          />
        </MainPanel>
      </Container>
    </PageLayout>
  );
}
