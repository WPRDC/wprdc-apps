import { DOMNode, Element } from "html-react-parser";

import { JSX } from "react/jsx-runtime";
import {
  CMSArtifact,
  CMSAuthor,
  CMSBlog,
  CMSCategory,
  CMSProject,
  CMSTag,
  CMSTool,
  CMSWeeknote,
  StrapiBase,
} from "./model.ts";

export * from "./model";

export interface AttributeRecord {}

export interface MetadataRecord {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<
  T extends StrapiBase,
  M extends MetadataRecord = MetadataRecord,
> {
  data: T;
  meta: M;
}

export interface StrapiListResponse<
  T extends StrapiBase,
  M extends MetadataRecord = MetadataRecord,
> {
  data: T[];
  meta: M;
}

export type ReplaceFn = (node: DOMNode) => JSX.Element | undefined;
export type Replacer = (props: ParserProps) => JSX.Element;
export type ReplacerRecord = Partial<
  Record<keyof JSX.IntrinsicElements, Replacer>
>;

export interface ParserProps
  extends Pick<Element, "name" | "attribs" | "type"> {
  children: DOMNode[];
  className?: string;
  replacer?: ReplaceFn;
}
