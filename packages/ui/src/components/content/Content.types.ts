/**
 *
 * Content types
 *
 **/
import { DOMNode, Element, HTMLReactParserOptions } from "html-react-parser";
import { JSX } from "react/jsx-runtime";

type IntrinsicElements = JSX.IntrinsicElements;

export type ReplaceFn = (node: DOMNode) => JSX.Element | undefined;
export type Replacer = (props: ParserProps) => JSX.Element;
export type ReplacerRecord = Partial<Record<keyof IntrinsicElements, Replacer>>;

export interface ParserProps
  extends Pick<Element, "name" | "attribs" | "type"> {
  children: DOMNode[];
  className?: string;
  replacer?: ReplaceFn;
}

export interface ContentProps {
  id?: string;
  children?: string | null;
  className?: string;
  replacer?: HTMLReactParserOptions["replace"];
}
