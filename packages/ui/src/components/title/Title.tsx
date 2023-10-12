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
      className={classNames(
        "ui-mb-4 ui-mt-8 ui-text-5xl ui-font-bold",
        props.className,
      )}
    >
      {props.children}
    </Heading>
  );
}
