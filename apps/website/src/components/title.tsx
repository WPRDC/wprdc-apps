import { HeadingTag } from "@wprdc/types";
import classNames from "classnames";
import { HTMLProps } from "react";

export interface TitleProps extends HTMLProps<HTMLHeadingElement> {
  headingTag?: HeadingTag;
}

export function Title(props: TitleProps) {
  const Heading = props.headingTag ?? "h1";
  return (
    <Heading
      className={classNames(
        "text-2xl lg:text-4xl xl:text-5xl font-black leading-tight text-primary",
        props.className,
      )}
    >
      {props.children}
    </Heading>
  );
}
