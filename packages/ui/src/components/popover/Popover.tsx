import * as React from "react";
import { DismissButton, Overlay, usePopover } from "react-aria";
import type { PopoverProps } from "./Popover.types.ts";

export function Popover({
  children,
  state,
  offset = 22,
  ...props
}: PopoverProps): React.ReactElement {
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
    },
    state,
  );

  /* eslint-disable @typescript-eslint/unbound-method -- offending functions come from react-aria */
  return (
    <Overlay>
      <div {...underlayProps} className="fixed inset-0" />
      <div {...popoverProps} className="w-full" ref={popoverRef}>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
