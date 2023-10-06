import * as React from "react";
import { domToReact } from "html-react-parser";
import classNames from "classnames";
import type { ParserProps } from "../ParsedHTML.types";

export function ParsedUL(props: ParserProps): React.ReactElement {
  const { style: _, ...attribs } = props.attribs;

  return (
    <ul
      {...attribs}
      className={classNames("list-inside list-disc", props.className)}
    >
      {domToReact(props.children, { replace: props.replacer })}
    </ul>
  );
}
