import { BreadcrumbItem, Breadcrumbs } from "@/components/breadcrumbs";
import { PageLayout } from "@/components/page-layout";
import { Title } from "@/components/title";
import { getContentByID } from "@wprdc/api";
import { CMSWeeknote } from "@wprdc/types";
import { Content } from "@wprdc/ui";
import { Metadata } from "next";
import React from "react";

import { processContent } from "@/lib/parsing";

type Props = {
  params: Promise<{
    lang: string;
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, lang } = await params;
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
  const { id, lang } = await params;
  const { data: dispatch } = await getContentByID<CMSWeeknote>(
    "/weeknotes",
    id,
    lang,
    "*",
  );

  const { article, publishedAt } = dispatch;

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
      label: "Dispatches",
      href: "/dispatches",
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
      <Content
        dangerouslySetInnerHTML={{ __html: processContent(article ?? "") }}
      ></Content>
    </PageLayout>
  );
}
