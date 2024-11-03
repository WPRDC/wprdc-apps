import { Content } from "@wprdc/ui";
import React from "react";
import { processContent } from "@/lib/parsing.ts";

export interface BlurbProps {
  header?: string | null;
  description?: string | null;
}

export function Blurb({ header, description }: BlurbProps) {
  return (
    <article className="">
      <h2 className="text-textSecondary dark:text-textSecondaryDark mb-1 font-mono text-lg font-bold uppercase lg:text-xl">
        {header}
      </h2>
      <Content
        variant="blurb"
        dangerouslySetInnerHTML={{ __html: processContent(description ?? "") }}
      />
    </article>
  );
}
