import { A, Content } from "@wprdc/ui";
import { CMSWeeknote, ListableContentType } from "@wprdc/types";

import { convert } from "html-to-text";
import React from "react";
import { processContent } from "@/lib/parsing";

export interface ListItemProps<T extends ListableContentType> {
  item: T;
  basePath?: string;
}

const EXCERPT_LENGTH = 400; // chars

function extractContent(html: string | null): string | null {
  if (!html) return html;
  return (
    convert(html, {
      selectors: [{ selector: "a", options: { ignoreHref: true } }],
    }).slice(0, EXCERPT_LENGTH) + "..."
  );
}

function getLastSunday(d: string): Date {
  let t = new Date(d.split("T")[0]);
  t.setDate(t.getDate() - t.getDay());
  return t;
}

export function BlogListItem<T extends ListableContentType>({
  item,
  basePath = "",
}: ListItemProps<T>) {
  const {
    slug,
    title,
    publishedAt,
    excerpt,
    article,
    publishDate,
    author,
    category,
  } = item;

  const text = excerpt || extractContent(article) || "";

  const href = `${basePath}/${slug}`;

  return (
    <li>
      <article
        key={slug}
        className="border-text-secondary flex flex-col items-stretch space-y-6 rounded-md border-2 bg-white p-4"
      >
        <h3>
          <A
            variant="button"
            buttonVariant="borderless"
            className="underline-none p-0 text-xl font-bold normal-case hover:underline lg:text-2xl xl:text-3xl"
            href={href}
          >
            {title}
          </A>
        </h3>
        <small className="text-text-secondary dark:text-text-secondary-dark text-sm">
          {!!publishDate && (
            <time
              className="font-bold"
              dateTime={new Date(publishDate).toISOString()}
            >
              {new Date(publishDate).toLocaleDateString("en-US", {
                dateStyle: "medium",
              })}
            </time>
          )}

          <span className="px-2">•</span>

          <address className="inline font-bold not-italic">
            {author?.name ?? "The WPRDC"}
          </address>
        </small>
        <div className="line-clamp-3">
          <Content
            dangerouslySetInnerHTML={{ __html: processContent(text ?? "") }}
          />
        </div>
        <A variant="button" buttonVariant="primary" href={href}>
          Read More
        </A>
      </article>
    </li>
  );
}

export function BriefListItem({
  item,
  basePath = "",
}: ListItemProps<CMSWeeknote>) {
  const {
    slug: _slug,
    id,
    title,
    publishedAt,
    excerpt,
    article,
    publishDate,
    author,
    category,
    week,
  } = item;

  const slug = _slug || id.toString();

  const href = `${basePath}/${slug}`;

  const weekStart = getLastSunday(week ?? publishedAt ?? "");

  return (
    <li>
      <article
        key={slug}
        className="border-text-secondary flex flex-col items-stretch space-y-6 rounded-md border-2 bg-white p-4"
      >
        {!!weekStart && (
          <hgroup>
            <h3>
              <A
                variant="button"
                buttonVariant="borderless"
                className="underline-none p-0 text-xl font-bold normal-case hover:underline lg:text-2xl xl:text-3xl"
                href={href}
              >
                <time
                  className="font-bold"
                  dateTime={new Date(weekStart).toISOString()}
                >
                  <span>Week of</span>{" "}
                  <span>
                    {new Date(weekStart).toLocaleDateString("en-US", {
                      dateStyle: "medium",
                    })}
                  </span>
                </time>
              </A>
            </h3>
            {!!title && <p className="bold mt-3 font-bold italic">{title}</p>}
          </hgroup>
        )}

        <div className="">
          <Content
            dangerouslySetInnerHTML={{ __html: processContent(article ?? "") }}
          />
        </div>
      </article>
    </li>
  );
}
