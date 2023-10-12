import * as React from "react";
import type { ParserProps } from "../ParsedHTML.types";
import { PopupImage } from "../../popup-image";

export function ParsedImg(props: ParserProps): React.ReactElement {
  const { style: _, src, alt, ...attribs } = props.attribs;

  return (
    <PopupImage alt={alt} height={500} src={src} width={500} {...attribs} />
  );
}
