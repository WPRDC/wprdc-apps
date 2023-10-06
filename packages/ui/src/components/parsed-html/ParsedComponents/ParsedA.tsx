import * as React from "react";
import { domToReact } from "html-react-parser";
import classNames from "classnames";
import type { ParserProps } from "../ParsedHTML.types";
import { A } from "../../a";

export function ParsedA(props: ParserProps): React.ReactElement {
  const { style: _, ...attribs } = props.attribs;

  return (
    <A {...attribs} className={classNames("font-sans", props.className)}>
      {domToReact(props.children, { replace: props.replacer })}
    </A>
  );
}
