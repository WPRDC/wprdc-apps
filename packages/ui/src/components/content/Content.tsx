/**
 *
 * Content
 *
 * Renders html or markdown content
 *
 **/
import parse from "html-react-parser";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import type { ContentProps } from "./Content.types";
import { defaultReplace } from "./lib.tsx";

export function Content({ children, className, replacer, id }: ContentProps) {
  return (
    <div className={twMerge("font-sans text-lg", className)} id={id}>
      {parse(children ?? "", {
        replace: replacer ?? defaultReplace,
      })}
    </div>
  );
}
