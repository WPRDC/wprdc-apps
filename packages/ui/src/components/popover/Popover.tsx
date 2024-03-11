"use client";

import { OverlayArrow, Popover as RAPopover } from "react-aria-components";
import type { PopoverProps } from "./Popover.types";

export function Popover({
  withArrow,
  children,
  ...props
}: PopoverProps): React.ReactElement {
  return (
    <RAPopover {...props}>
      <>
        {withArrow ? (
          <OverlayArrow>
            <svg height={12} viewBox="0 0 12 12" width={12}>
              <path d="M0 0 L6 6 L12 0" />
            </svg>
          </OverlayArrow>
        ) : null}

        {children}
      </>
    </RAPopover>
  );
}
