/**
 *
 * Subtitle
 *
 * Extra text below a title
 *
 **/
import * as React from "react";
import type { SubtitleProps } from "./Subtitle.types.ts";

export function Subtitle(props: SubtitleProps): React.ReactElement | null {
  if (!props.children) return null;
  return <div className="ui-mb-4 ui-mt-8 ui-text-2xl">{props.children}</div>;
}
