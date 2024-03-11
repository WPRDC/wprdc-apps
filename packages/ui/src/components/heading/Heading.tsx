/**
 *
 * Heading
 *
 * Section heading
 *
 */
"use client";

import { twMerge } from "tailwind-merge";
import { Heading as RAHeading } from "react-aria-components";
import type { HeadingProps } from "./Heading.types";

export function Heading({
  level,
  className,
  ...props
}: HeadingProps): React.ReactElement {
  return (
    <RAHeading
      className={twMerge(
        "font-bold",
        level === 1 && "mb-2 text-5xl",
        level === 2 &&
          "mb-4 mt-2 border-t border-textSecondary pt-2 text-4xl dark:border-textSecondaryDark",
        level === 3 && "mb-2 mt-3 text-3xl",
        level === 4 && "mb-2 mt-3 text-2xl",
        level === 5 && "mb-2 mt-3 text-xl",
        level === 6 && "mb-2 mt-3 text-lg",
        className,
      )}
      level={level}
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
