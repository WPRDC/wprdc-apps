import classNames from "classnames";
import { DOMNode, domToReact } from "html-react-parser";
import { ParserProps } from "../Content.types";
import { defaultReplace } from "../lib";

export function ParsedSpan(props: ParserProps) {
  const { style, ...attribs } = props.attribs;
  const replacer = props.replacer ?? defaultReplace;
  return (
    <span className={classNames(props.className)}>
      {domToReact(props.children, { replace: replacer })}
    </span>
  );
}
