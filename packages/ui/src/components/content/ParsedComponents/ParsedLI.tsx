import classNames from "classnames";
import { DOMNode, domToReact } from "html-react-parser";
import { ParserProps } from "../Content.types";
import { defaultReplace } from "../lib";

export interface ParsedLIProps extends ParserProps {
  children: DOMNode[];
}

export function ParsedLI(props: ParsedLIProps) {
  const { style, ...attribs } = props.attribs;
  const replacer = props.replacer ?? defaultReplace;
  return (
    <li className={classNames(props.className)}>
      {domToReact(props.children, { replace: replacer })}
    </li>
  );
}
