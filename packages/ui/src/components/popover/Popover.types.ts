/**
 *
 * Popover types
 *
 **/
import type { PopoverProps as RAPopoverProps } from "react-aria-components";

export interface PopoverProps extends RAPopoverProps {
  withArrow?: boolean;
  children?: React.ReactNode;
}
