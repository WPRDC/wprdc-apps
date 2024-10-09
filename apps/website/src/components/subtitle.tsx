import React, { PropsWithChildren } from "react";

export interface SubtitleProps extends PropsWithChildren<{}> {}

export function Subtitle(props: SubtitleProps) {
  if (!props.children) return undefined;
  return (
    <p className="mt-4 xl:mt-8 text-lg lg:text-xl xl:text-2xl font-bold">
      {props.children}
    </p>
  );
}
