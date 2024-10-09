import classNames from "classnames";
import { DOMNode, domToReact } from "html-react-parser";
import { ParserProps } from "../Content.types";
import { defaultReplace } from "../lib";

export interface ParsedOLProps extends ParserProps {
  children: DOMNode[];
}

export function ParsedOL(props: ParsedOLProps) {
  const { style, ...attribs } = props.attribs;
  const replacer = props.replacer ?? defaultReplace;

  return (
    <ul
      {...attribs}
      className={classNames("list-inside list-decimal", props.className)}
    >
      {domToReact(props.children, { replace: replacer })}
    </ul>
  );
}
