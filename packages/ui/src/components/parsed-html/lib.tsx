import React from "react";
import type { DOMNode } from "html-react-parser";
import { attributesToProps, domToReact, Element } from "html-react-parser";
import type { ChildNode } from "domhandler";
import { JSX } from "react/jsx-runtime";
import slugify from "slugify";
import type { ReplacerRecord } from "./ParsedHTML.types.ts";
import IntrinsicElements = JSX.IntrinsicElements;

export function makeHeadingID(headingChildren: ChildNode[]): string {
  return headingChildren.reduce(
    (acc, cur) => `${acc}${acc ? "-" : ""}${slugify(getChildNodeText(cur))}`,
    "",
  );
}

export function getChildNodeText(node: ChildNode): string {
  switch (node.type) {
    // text is raw text within elements
    case "text":
      return node.data;
    // Elements eventually have text children or nothing
    case "tag":
      return makeHeadingID(node.children);
    // the remaining types have no relevant text within them
    default:
      return "";
  }
}

export const makeReplacer = (replacers: ReplacerRecord) =>
  function replace(domNode: DOMNode) {
    if (domNode instanceof Element) {
      const ReplacedElement =
        replacers[domNode.name as keyof IntrinsicElements];
      if (ReplacedElement) {
        return (
          <ReplacedElement {...domNode} replacer={makeReplacer(replacers)}>
            {domNode.children}
          </ReplacedElement>
        );
      }
      const Tag = domNode.name as keyof IntrinsicElements;
      const { style: _, ...props } = attributesToProps(domNode.attribs);

      return (
        <Tag {...props}>
          {domToReact(domNode.children, { replace: makeReplacer(replacers) })}
        </Tag>
      );
    }
  };
