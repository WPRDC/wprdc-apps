import { ParserProps, ReplacerRecord } from "@wprdc/types";
import { Content, makeReplacer, ParsedP } from "@wprdc/ui";
import React from "react";

export interface BlurbProps {
  header?: string | null;
  description?: string | null;
}

const blurbReplacers: ReplacerRecord = {
  p: (props: ParserProps) => (
    <ParsedP
      {...props}
      className="text-left text-sm lg:text-base leading-relaxed"
    />
  ),
};

export function Blurb({ header, description }: BlurbProps) {
  const replacer = makeReplacer({ ...blurbReplacers });
  return (
    <article className="">
      <h2 className="text-textSecondary dark:text-textSecondaryDark mb-1 font-mono text-lg lg:text-xl font-bold uppercase">
        {header}
      </h2>
      <Content className="leading-relaxed" replacer={replacer}>
        {description ?? ""}
      </Content>
    </article>
  );
}
