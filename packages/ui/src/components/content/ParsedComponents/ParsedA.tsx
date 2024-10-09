import classNames from "classnames";
import { domToReact } from "html-react-parser";
import { A } from "../../a";
import { ParserProps } from "../Content.types";
import { defaultReplace } from "../lib";

export function ParsedA(props: ParserProps) {
  const { style, href, ...attribs } = props.attribs;
  const replacer = props.replacer ?? defaultReplace;

  return (
    <A
      {...attribs}
      href={href}
      className={classNames("font-sans", props.className)}
    >
      {domToReact(props.children, { replace: replacer })}
    </A>
  );
}
