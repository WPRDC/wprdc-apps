"use client";

import { VegaLite as VegaLite_ } from "react-vega";
import { type VegaLiteProps } from "react-vega/src/VegaLite";

export function VegaLite(props: VegaLiteProps) {
  return <VegaLite_ {...props} />;
}
