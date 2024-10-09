import classNames from "classnames";
import { domToReact } from "html-react-parser";
import { ParserProps } from "../Content.types";
import { defaultReplace } from "../lib";

export function ParsedUL(props: ParserProps) {
  const { style, ...attribs } = props.attribs;
  const replacer = props.replacer ?? defaultReplace;

  return (
    <ul
      {...attribs}
      className={classNames("list-inside list-disc", props.className)}
    >
      {domToReact(props.children, { replace: replacer })}
    </ul>
  );
}
