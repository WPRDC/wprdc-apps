import * as React from "react";
import { domToReact } from "html-react-parser";
import classNames from "classnames";
import type { ParserProps } from "../ParsedHTML.types";

export function ParsedLI(props: ParserProps): React.ReactElement {
  const { style: _, ...attribs } = props.attribs;

  return (
    <li className={classNames(props.className)} {...attribs}>
      {domToReact(props.children, { replace: props.replacer })}
    </li>
  );
}
