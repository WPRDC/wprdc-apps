import * as React from "react";
import { attributesToProps, domToReact } from "html-react-parser";
import classNames from "classnames";
import type { ParserProps } from "../ParsedHTML.types";

export function ParsedFigure(props: ParserProps): React.ReactElement {
  const { style: _, ...attribs } = props.attribs;

  return (
    <figure
      {...attributesToProps(attribs)}
      className={classNames(
        "mx-auto my-6 flex min-h-[200px] w-fit max-w-3xl flex-col items-center",
        props.className,
      )}
    >
      {domToReact(props.children, { replace: props.replacer })}
    </figure>
  );
}
