import * as React from "react";
import { domToReact } from "html-react-parser";
import classNames from "classnames";
import type { ParserProps } from "../ParsedHTML.types";

export function ParsedSpan(props: ParserProps): React.ReactElement {
  const { style: _, ...attribs } = props.attribs;

  return (
    <span className={classNames(props.className)} {...attribs}>
      {domToReact(props.children, { replace: props.replacer })}
    </span>
  );
}
