/**
 *
 * Heading
 *
 * Section heading
 *
 */
import * as React from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import type { HeadingProps } from "./Heading.types.ts";
import { HEADING_LEVELS } from "./Heading.types.ts";

export function Heading({
  level,
  className,
  ...props
}: HeadingProps): React.ReactElement {
  const HeadingElem: keyof React.JSX.IntrinsicElements =
    !!level && HEADING_LEVELS.includes(level)
      ? (`h${level}` as keyof React.JSX.IntrinsicElements)
      : "div";
  return (
    <HeadingElem
      className={twMerge(
        classNames("ui-font-mono ui-font-bold", {
          "ui-mb-2 ui-text-5xl": level === 1,
          "ui-mb-2 ui-mt-3 ui-border-t ui-border-textSecondary ui-pt-1 ui-text-4xl dark:ui-border-textSecondaryDark":
            level === 2,
          "ui-mb-2 ui-mt-3 ui-text-3xl": level === 3,
          "ui-mb-2 ui-mt-3 ui-text-2xl": level === 4,
          "ui-mb-2 ui-mt-3 ui-text-xl": level === 5,
          "ui-mb-2 ui-mt-3 ui-text-lg": level === 6,
        }),
        className,
      )}
      {...props}
    />
  );
}

type LeveledProps = Omit<HeadingProps, "level" | "className">;

export function H1(props: LeveledProps): React.ReactElement {
  return <Heading level={1} {...props} />;
}

export function H2(props: LeveledProps): React.ReactElement {
  return <Heading level={2} {...props} />;
}

export function H3(props: LeveledProps): React.ReactElement {
  return <Heading level={3} {...props} />;
}

export function H4(props: LeveledProps): React.ReactElement {
  return <Heading level={4} {...props} />;
}

export function H5(props: LeveledProps): React.ReactElement {
  return <Heading level={5} {...props} />;
}

export function H6(props: LeveledProps): React.ReactElement {
  return <Heading level={6} {...props} />;
}
