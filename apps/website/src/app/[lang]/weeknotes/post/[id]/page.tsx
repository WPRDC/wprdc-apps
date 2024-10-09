import { BreadcrumbItem, Breadcrumbs } from "@/components/breadcrumbs.tsx";
import { PageLayout } from "@/components/page-layout.tsx";
import { Title } from "@/components/title.tsx";
import { getContentByID } from "@wprdc/api";
import { CMSWeeknote } from "@wprdc/types";
import { Content } from "@wprdc/ui";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: {
    lang: string;
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, lang } = params;
  const { data: weeknote } = await getContentByID<CMSWeeknote>(
    "/weeknotes",
    id,
    lang,
    "*",
  );
  const dateString = new Date(weeknote?.publishedAt).toLocaleDateString();

  return {
    title: `WPRDC | Weeknote ${dateString}`,
  };
}

export default async function BlogRoute({ params }: Props) {
  const { id, lang } = params;
  const { data: weeknote } = await getContentByID<CMSWeeknote>(
    "/weeknotes",
    id,
    lang,
    "*",
  );

  const { article, author, publishedAt } = weeknote;

  const dateString = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const path: BreadcrumbItem[] = [
    {
      id: "1",
      label: "Home",
      href: "/",
    },
    {
      id: "2",
      label: "Weeknotes",
      href: "/weeknotes",
    },
    {
      id: "4",
      label: dateString ?? "",
      href: `#`,
    },
  ];

  return (
    <PageLayout>
      <Breadcrumbs path={path} />
      <Title>Week of {dateString}</Title>
      <Content>{article}</Content>
    </PageLayout>
  );
}
