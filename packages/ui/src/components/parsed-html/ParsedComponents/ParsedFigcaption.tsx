import * as React from "react";
import { attributesToProps, domToReact } from "html-react-parser";
import classNames from "classnames";
import type { ParserProps } from "../ParsedHTML.types";

export type ParsedFigcaptionProps = ParserProps;

export function ParsedFigcaption(props: ParserProps): React.ReactElement {
  const { style: _, ...attribs } = props.attribs;

  return (
    <figcaption
      {...attributesToProps(attribs)}
      className={classNames(
        "text-textSecondary dark:text-textSecondaryDark max-w-2xl py-0.5 text-center font-mono text-sm italic",
        props.className,
      )}
    >
      {domToReact(props.children, { replace: props.replacer })}
    </figcaption>
  );
}
