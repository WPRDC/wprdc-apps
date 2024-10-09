import classNames from "classnames";
import { domToReact } from "html-react-parser";
import { ParserProps } from "../Content.types";
import { defaultReplace } from "../lib";

export function ParsedP(props: ParserProps) {
  const { style, ...attribs } = props.attribs;
  const replacer = props.replacer ?? defaultReplace;

  return (
    <div
      {...attribs}
      className={classNames(
        "mb-4 mt-1 text-justify text-lg leading-relaxed",
        props.className,
      )}
    >
      {domToReact(props.children, { replace: replacer })}
    </div>
  );
}
