/*
 * Displays table of content or other extra context
 *
 */

import { A, slugify } from "@wprdc/ui";
import React from "react";
import {
  FaBook,
  FaDatabase,
  FaGithub,
  FaLink,
  FaPerson,
} from "react-icons/fa6";
import { Tags } from "./tags";
import { CMSLink, CMSTag } from "@wprdc/types";
import { twMerge } from "tailwind-merge";

import * as cheerio from "cheerio";
import { Element } from "html-react-parser";

export interface SidebarProps {
  title?: string;
  /** contents of page to extract a TOC from */
  contents?: string | null;
  /** set of tags for the page*/
  tags?: CMSTag[];
  /** documentation links */
  docLinks?: (string | null)[];
  /** links to relevant repos */
  githubLinks?: (string | null)[];
  /** other useful links */
  relatedPages?: (CMSLink | null)[];

  /** title for link section */
  relatedLinksTitle?: string;

  className?: string;
}

type LinkCategory = "doc" | "github" | "page";

export function Sidebar({
  contents,
  tags,
  title,
  docLinks = [],
  githubLinks = [],
  relatedPages = [],
  relatedLinksTitle,
  className,
}: SidebarProps) {
  // create one list of links with their type for logos

  function notNull(l: CMSLink | null): l is CMSLink {
    return l !== null;
  }

  const links: CMSLink[] = relatedPages.filter(notNull);

  const $ = cheerio.load(contents ?? "");

  const headings: cheerio.Cheerio<Element>[] = [];
  $("h1, h2, h3, h4, h5, h6").each((i, element) => {
    headings.push($(element));
  });

  return (
    <>
      <aside
        className={twMerge(
          "lg:border-text dark:border-textDark flex w-full flex-col space-y-5 bg-white pb-4 lg:sticky lg:top-12 lg:border lg:p-2",
          className,
        )}
      >
        {!!headings && !!headings.length && (
          <section>
            <nav>
              <h2 className="mb-2 text-xs font-bold uppercase">On this page</h2>
              <ol className="flex flex-col space-y-1 px-1.5 text-sm">
                {headings.map((heading) => {
                  const id = slugify(heading.text());
                  return (
                    <li key={id}>
                      <A href={`#${id}`} className="font-sans">
                        {heading.text()}
                      </A>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </section>
        )}

        {!!links && !!links.length && (
          <section>
            <h2 className="mb-1 text-sm uppercase">
              {relatedLinksTitle ?? "More Links"}
            </h2>
            <ul>
              {!!links &&
                links.map((link) => (
                  <li
                    key={link.id}
                    className="mb-1 block overflow-x-clip truncate whitespace-nowrap text-sm"
                  >
                    <span aria-hidden>
                      <LinkIcon link={link} />
                    </span>
                    <A href={link.url ?? ""}>{link.label}</A>
                  </li>
                ))}
            </ul>
          </section>
        )}

        {!!tags && !!tags.length && (
          <section>
            <h2 className="mb-2 text-xs font-bold uppercase">Tags</h2>
            <Tags tags={tags} size="S" />
          </section>
        )}
      </aside>
    </>
  );
}

interface LinkIconProps {
  link: CMSLink;
}

function LinkIcon({ link }: LinkIconProps) {
  const props = { className: "mr-1 inline-block" };
  switch (link.category) {
    case "documentation":
      return <FaBook {...props} />;
    case "repo":
      return <FaGithub {...props} />;
    case "dataset":
      return <FaDatabase {...props} />;
    case "team-member":
      return <FaPerson {...props} />;
    default:
      return <FaLink {...props} />;
  }
}
