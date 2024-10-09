"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { VegaLite } from "react-vega";
import { twMerge } from "tailwind-merge";
import { type VegaLiteProps } from "react-vega/src/VegaLite";

type Dimensions = Pick<DOMRectReadOnly, "width" | "height">;

export interface ChartProps extends VegaLiteProps {
  title?: ReactNode;
}

/**
 * Wrapper for charts that provides styling and sizing.
 */
export function Chart({
  title,
  spec,
  data,
  tooltip,
  signalListeners,
}: ChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>();

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!!entries && !!entries.length) {
        const { height, width } = entries[0].contentRect;
        setDimensions({ height: height - 20, width: width - 10 });
      }
    });
    // observer size of root div
    if (ref.current) resizeObserver.observe(ref.current);

    // clean up fn
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // handle possible ways of passing data

  return (
    <div className="mb-4 w-full">
      {!!title && <h3 className="z-10 mb-2 text-sm font-medium">{title}</h3>}
      <div ref={ref} className={twMerge("relative flex-grow")}>
        {!!dimensions && !!data && !!spec && (
          <VegaLite
            className="w-full"
            spec={spec}
            data={data}
            actions={false}
            signalListeners={signalListeners}
            tooltip={tooltip}
            hover
          />
        )}
      </div>
    </div>
  );
}
