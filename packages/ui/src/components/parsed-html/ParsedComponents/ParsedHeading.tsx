import { domToReact } from "html-react-parser";
import * as React from "react";
import classNames from "classnames";
import { makeHeadingID } from "../lib";
import type { ParserProps } from "../ParsedHTML.types";
import type { HeadingTag } from "../../../types";

export function ParsedHeading(props: ParserProps): React.ReactElement {
  const { style: _, ...attribs } = props.attribs;
  const Heading = props.name as HeadingTag;
  const idSlug = makeHeadingID(props.children);

  return (
    <Heading
      {...attribs}
      className={classNames(
        "text-textSecondary dark:text-textSecondaryDark mt-8 font-mono font-semibold",
        {
          "text-3xl": Heading === "h1" || Heading === "h2",
          "text-2xl": Heading === "h3",
          "text-xl": Heading === "h4",
          "text-lg": Heading === "h5",
          "text-base": Heading === "h6",
        },
        props.className,
      )}
      id={idSlug}
    >
      {domToReact(props.children, { replace: props.replacer })}
    </Heading>
  );
}
