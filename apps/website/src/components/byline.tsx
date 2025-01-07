import { WEEKNOTE_AUTHORS } from "@/lib/constants";
import { CMSAuthor } from "@wprdc/types";
import { A } from "@wprdc/ui";

export interface BylineProps {
  author?: CMSAuthor | null;
  timestamp: string;
}

export function Byline({ author, timestamp }: BylineProps) {
  return (
    <div className="pt-6">
      {!!timestamp && (
        <time
          className="font-bold"
          dateTime={new Date(timestamp).toISOString()}
        >
          {new Date(timestamp).toLocaleDateString("en-US", {
            dateStyle: "medium",
          })}
        </time>
      )}
      <span className="px-2">•</span>

      {!!author && (
        <>
          <div className="inline not-italic">
            {WEEKNOTE_AUTHORS.includes(author.slug ?? "") ? (
              <A href={`/team/${author.slug}`} className="hover:text-black">
                {author.name}
              </A>
            ) : (
              <span> {author.name}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
