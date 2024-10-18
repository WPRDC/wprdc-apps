"use client";

import { type VegaLiteProps } from "react-vega/lib/VegaLite";
import { VegaLite } from "react-vega";
import { twMerge } from "tailwind-merge";

export type ChartVizProps = VegaLiteProps;

export function ChartViz({
  actions = false,
  className,
  ...props
}: ChartVizProps): React.ReactElement {
  return (
    <div
      className={twMerge("w-full border border-black bg-white p-1", className)}
    >
      <VegaLite className="w-full" actions={actions} {...props} />
    </div>
  );
}
