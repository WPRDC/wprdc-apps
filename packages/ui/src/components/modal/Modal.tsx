/**
 *
 * Modal
 *
 * Overlayed content that takes focus and hides content below
 *
 **/
import * as React from "react";
import { CSSTransition } from "react-transition-group";
import { Overlay, useModalOverlay } from "react-aria";
import { FaXmark } from "react-icons/fa6";
import type { ModalProps } from "./Modal.types.ts";

export function Modal(props: ModalProps): React.ReactElement | null {
  const { children, state } = props;

  const ref = React.useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);
  const [exited, setExited] = React.useState(!state.isOpen);

  // Don't render anything if the modal is not open, and we're not animating out.
  if (!(state.isOpen || !exited)) {
    return null;
  }

  return (
    /* eslint-disable @typescript-eslint/unbound-method -- offending functions come from react-aria */
    <Overlay>
      <CSSTransition
        appear
        classNames={{
          enter: "ui-opacity-0",
          enterDone:
            "ui-opacity-1 ui-backdrop-blur-sm ui-transition ui-ease-linear",
          exit: "ui-opacity-0 ui-backdrop-blur-none ui-transition ui-ease-out",
        }}
        in={state.isOpen}
        onEntered={() => {
          setExited(false);
        }}
        onExited={() => {
          setExited(true);
        }}
        timeout={{ enter: 0, exit: 0 }}
      >
        <div
          className="ui-z-100 ui-fixed ui-inset-0 ui-flex ui-justify-center ui-bg-slate-400/20"
          {...underlayProps}
        >
          <div
            {...modalProps}
            className="ui-z-1 ui-relative ui-top-[10%] ui-h-fit ui-border-2 ui-border-textSecondary ui-shadow-2xl focus:ui-outline-none dark:ui-border-textSecondaryDark"
            ref={ref}
          >
            <button
              aria-label="ui-close"
              className="ui-absolute ui-right-4 ui-top-4 ui-border ui-border-textSecondary ui-bg-background ui-shadow-lg hover:ui-bg-red-500 hover:ui-shadow-2xl dark:ui-border-textSecondaryDark dark:ui-bg-backgroundDark"
              onClick={state.close}
              type="button"
            >
              <FaXmark />
            </button>
            {children}
          </div>
        </div>
      </CSSTransition>
    </Overlay>
  );
}
