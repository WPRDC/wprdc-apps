"use client";

import { VegaEmbed, VegaEmbedProps } from "react-vega";
import { twMerge } from "tailwind-merge";

export type ChartVizProps = VegaEmbedProps;

export function ChartViz({
  className,
  ...props
}: ChartVizProps): React.ReactElement {
  return (
    <div
      className={twMerge("w-full border border-black bg-white p-1", className)}
    >
      <VegaEmbed className="w-full"  {...props} />
    </div>
  );
}
