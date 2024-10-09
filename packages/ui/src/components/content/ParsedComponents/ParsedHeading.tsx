import { type HeadingTag } from "@wprdc/types";
import classNames from "classnames";
import { type DOMNode, domToReact } from "html-react-parser";
import { type ParserProps } from "../Content.types";
import { defaultReplace, makeHeadingID } from "../lib";

export interface ParsedHeadingProps extends ParserProps {
  children: DOMNode[];
}

export function ParsedHeading(props: ParsedHeadingProps) {
  const { style, ...attribs } = props.attribs;
  const Heading = props.name as HeadingTag;
  const idSlug = makeHeadingID(props.children);
  const replacer = props.replacer ?? defaultReplace;

  return (
    <Heading
      {...attribs}
      id={idSlug}
      className={classNames(
        "mt-8 font-mono font-semibold text-textSecondary dark:text-textSecondaryDark",
        {
          "text-3xl": Heading === "h1" || Heading === "h2",
          "text-2xl": Heading === "h3",
          "text-xl": Heading === "h4",
          "text-lg": Heading === "h5",
          "text-base": Heading === "h6",
        },
        props.className,
      )}
    >
      {domToReact(props.children, { replace: replacer })}
    </Heading>
  );
}
