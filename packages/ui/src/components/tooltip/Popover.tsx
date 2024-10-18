import React from "react";
import type { PopoverProps as RAPopoverProps } from "react-aria-components";
import {
  Dialog,
  OverlayArrow,
  Popover as RAPopover,
} from "react-aria-components";

interface PopoverProps extends Omit<RAPopoverProps, "children"> {
  children: React.ReactNode;
}
export function Popover(props: PopoverProps): React.ReactElement {
  return (
    <RAPopover
      className={({ isEntering, isExiting }) =>
        `group rounded-sm bg-white p-3 shadow-xl ring-2 ring-black placement-top:mb-2 placement-bottom:mt-2 ${
          isEntering
            ? "duration-200 ease-out animate-in fade-in placement-top:slide-in-from-bottom-1 placement-bottom:slide-in-from-top-1"
            : ""
        } ${
          isExiting
            ? "duration-150 ease-in animate-out fade-out placement-top:slide-out-to-bottom-1 placement-bottom:slide-out-to-top-1"
            : ""
        }`
      }
    >
      {/*<OverlayArrow>*/}
      {/*  <svg*/}
      {/*    className="block h-4 w-4 fill-white stroke-black stroke-2 group-placement-bottom:rotate-180"*/}
      {/*    viewBox="0 0 12 12"*/}
      {/*  >*/}
      {/*    <path d="M0 0L6 6L12 0" />*/}
      {/*  </svg>*/}
      {/*</OverlayArrow>*/}
      <Dialog className="max-w-sm">{props.children}</Dialog>
    </RAPopover>
  );
}
