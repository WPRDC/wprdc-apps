import * as React from "react";
import type { DOMNode } from "html-react-parser";
import { domToReact, Element } from "html-react-parser";
import classNames from "classnames";
import { A } from "../a";
import type { ReplacerRecord } from "./ParsedHTML.types.ts";
import { makeHeadingID, makeReplacer } from "./lib.tsx";
import {
  ParsedA,
  ParsedFigcaption,
  ParsedFigure,
  ParsedHeading,
  ParsedImg,
  ParsedOL,
  ParsedP,
  ParsedSpan,
  ParsedUL,
} from "./ParsedComponents";

const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

export const defaultReplacers: ReplacerRecord = {
  figure: ParsedFigure,
  figcaption: ParsedFigcaption,
  img: ParsedImg,
  a: ParsedA,
  span: ParsedSpan,
  p: ParsedP,
  h1: ParsedHeading,
  h2: ParsedHeading,
  h3: ParsedHeading,
  h4: ParsedHeading,
  h5: ParsedHeading,
  h6: ParsedHeading,
  ul: ParsedUL,
  ol: ParsedOL,
  br: () => <br />,
};

/* eslint-disable react/jsx-no-useless-fragment
-- using empty fragments part of react-html-parser api */
// only show text when making an excerpt of some rich content
export const excerptReplacer: ReplacerRecord = {
  figure: () => <></>,
  figcaption: () => <></>,
  img: () => <></>,
  a: (props) => (
    <ParsedSpan {...props} replacer={makeReplacer(excerptReplacer)}>
      {props.children}
    </ParsedSpan>
  ),
  span: (props) => (
    <ParsedSpan {...props} replacer={makeReplacer(excerptReplacer)}>
      {props.children}
    </ParsedSpan>
  ),
  p: ParsedP,
  h1: ParsedP,
  h2: ParsedP,
  h3: ParsedP,
  h4: ParsedP,
  h5: ParsedP,
  h6: ParsedP,
  ul: ParsedUL,
  ol: ParsedOL,
  br: () => <></>,
};

export const defaultReplace = makeReplacer(defaultReplacers);

export function tocReplacer(domNode: DOMNode): React.ReactElement | null {
  if (domNode instanceof Element) {
    const tagName = domNode.name;
    if (HEADING_TAGS.includes(domNode.name)) {
      const idSlug = makeHeadingID(domNode.children);
      return (
        <li
          className={classNames("mb-2", {
            "": tagName === "h2",
            "ml-2": tagName === "h3",
            "ml-3": tagName === "h4",
            "ml-4": tagName === "h5",
            "ml-5": tagName === "h6",
          })}
        >
          <A href={`#${idSlug}`} replace shallow>
            {domToReact(domNode.children)}
          </A>
        </li>
      );
    }
    return <></>;
  }
  return null;
}
