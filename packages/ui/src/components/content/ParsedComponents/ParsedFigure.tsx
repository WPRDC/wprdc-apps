import { attributesToProps, DOMNode, domToReact } from "html-react-parser";
import { twMerge } from "tailwind-merge";
import { ParserProps } from "../Content.types";
import { defaultReplace } from "../lib";

export interface ParsedFigureProps extends ParserProps {
  children: DOMNode[];
}

export function ParsedFigure(props: ParsedFigureProps) {
  const { style, ...attribs } = props.attribs;
  const replacer = props.replacer ?? defaultReplace;

  return (
    <figure
      {...attributesToProps(attribs)}
      className={twMerge(
        "mx-auto my-6 flex min-h-[200px] w-fit max-w-3xl flex-col items-center",
        props.className,
      )}
    >
      {domToReact(props.children, { replace: replacer })}
    </figure>
  );
}
