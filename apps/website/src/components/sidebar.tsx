/*
 * Displays table of content or other extra context
 *
 */

import { A, Content, tocReplacer } from "@wprdc/ui";
import React from "react";
import {
  FaBook,
  FaDatabase,
  FaGithub,
  FaLink,
  FaPerson,
} from "react-icons/fa6";
import { Tags } from "./tags.tsx";
import { CMSLink, CMSTag } from "@wprdc/types";
import { twMerge } from "tailwind-merge";

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

  return (
    <>
      <aside
        className={twMerge(
          "lg:border-text dark:border-textDark w-full pb-4 lg:p-2 lg:border lg:sticky lg:top-12",
          className,
        )}
      >
        {!!contents && !!contents.match("<h") && (
          <nav>
            <h2 className="mb-2 text-xs font-bold uppercase">On this page</h2>
            <ol className="px-1.5 text-sm">
              <Content replacer={tocReplacer} className="text-sm">
                {contents}
              </Content>
            </ol>
          </nav>
        )}

        {!!links && !!links.length && (
          <>
            <div className="mb-1 text-sm uppercase">
              {relatedLinksTitle ?? "More Links"}
            </div>
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
          </>
        )}

        {!!tags && !!tags.length && (
          <div className="mt-5">
            <div className="mb-2 text-xs font-bold uppercase">Tags</div>
            <Tags tags={tags} size="S" />
          </div>
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
