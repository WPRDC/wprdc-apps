import * as React from "react";
import { domToReact } from "html-react-parser";
import classNames from "classnames";
import type { ParserProps } from "../ParsedHTML.types";

export function ParsedP(props: ParserProps): React.ReactElement {
  const { style: _, ...attribs } = props.attribs;

  return (
    <p
      {...attribs}
      className={classNames(
        "mb-4 mt-1 text-justify text-lg leading-relaxed",
        props.className,
      )}
    >
      {domToReact(props.children, { replace: props.replacer })}
    </p>
  );
}
