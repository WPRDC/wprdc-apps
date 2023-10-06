/**
 *
 * Popover types
 *
 **/
import type * as React from "react";
import type { AriaPopoverProps } from "react-aria";
import type { OverlayTriggerState } from "react-stately";

export interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode;
  state: OverlayTriggerState;
}
