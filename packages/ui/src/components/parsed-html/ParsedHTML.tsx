/**
 *
 * ParsedHtml
 *
 * Parsed HTML content rendered in React
 *
 **/
import * as React from "react";
import classNames from "classnames";
import parse from "html-react-parser";
import type { ParsedHTMLProps } from "./ParsedHTML.types.ts";
import { defaultReplace } from "./replacers.tsx";

export function ParsedHTML({
  children,
  className,
  replacer,
  id,
}: ParsedHTMLProps): React.ReactElement {
  return (
    <div className={classNames("font-sans text-lg", className)} id={id}>
      {parse(children ?? "", {
        replace: replacer ?? defaultReplace,
      })}
    </div>
  );
}
