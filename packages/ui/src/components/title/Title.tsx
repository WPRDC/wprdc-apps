/**
 *
 * Title
 *
 * Leading text that labels a section
 *
 **/
import * as React from "react";
import classNames from "classnames";
import type { TitleProps } from "./Title.types.ts";

export function Title(props: TitleProps): React.ReactElement {
  const Heading = props.headingTag ?? "h1";
  return (
    <Heading
      className={classNames("mb-4 mt-8 text-5xl font-bold", props.className)}
    >
      {props.children}
    </Heading>
  );
}
