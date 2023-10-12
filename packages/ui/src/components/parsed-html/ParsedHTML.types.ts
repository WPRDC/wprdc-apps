/**
 *
 * ParsedHtml types
 *
 **/
import type * as React from "react";
import type {
  DOMNode,
  HTMLReactParserOptions,
  Element,
} from "html-react-parser";

export interface ParsedHTMLProps {
  id?: string;
  children?: string | null;
  className?: string;
  replacer: HTMLReactParserOptions["replace"];
}

export type ReplaceFn = (node: DOMNode) => React.JSX.Element | undefined;
export type Replacer = (props: ParserProps) => React.JSX.Element;
export type ReplacerRecord = Partial<
  Record<keyof React.JSX.IntrinsicElements, Replacer>
>;

export interface ParserProps
  extends Pick<Element, "name" | "attribs" | "type" | "children"> {
  className?: string;
  replacer?: ReplaceFn;
}
