/**
 *
 * Content
 *
 * Renders html or markdown content
 *
 **/
import { twMerge } from "tailwind-merge";
import type { ContentProps } from "./Content.types";
import Markdown from "react-markdown";

export function Content({
  dangerouslySetInnerHTML,
  className,
  variant = "default",
  id,
  children,
  markdown,
}: ContentProps): React.ReactElement {
  return (
    <div
      id={id}
      className={twMerge(
        "prose font-sans prose-a:font-sans",
        variant === "default" && "prose-lg max-w-none",
        variant === "blurb" && "prose-sm",
        variant === "large" && "prose-2xl max-w-none",
        className,
      )}
      dangerouslySetInnerHTML={children ? dangerouslySetInnerHTML : undefined}
    >
      {!markdown ? children : <Markdown>{markdown}</Markdown>}
    </div>
  );
}
