import { attributesToProps, domToReact } from "html-react-parser";
import { twMerge } from "tailwind-merge";
import { ParserProps } from "../Content.types";
import { defaultReplace } from "../lib";

export function ParsedFigcaption(props: ParserProps) {
  const { style, ...attribs } = props.attribs;
  const replacer = props.replacer ?? defaultReplace;

  return (
    <figcaption
      {...attributesToProps(attribs)}
      className={twMerge(
        "max-w-2xl py-0.5 text-center font-mono text-sm italic text-textSecondary dark:text-textSecondaryDark",
        props.className,
      )}
    >
      {domToReact(props.children, { replace: replacer })}
    </figcaption>
  );
}
