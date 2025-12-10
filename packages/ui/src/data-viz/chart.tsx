"use client";
import { VegaEmbedProps } from "react-vega";
import { twMerge } from "tailwind-merge";

import dynamic from "next/dynamic";

// fixes issue in dev where a set gets passed from a server to a client component
const VegaEmbed = dynamic(() => import("react-vega").then((m) => m.VegaEmbed), {
  ssr: false,
});

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
