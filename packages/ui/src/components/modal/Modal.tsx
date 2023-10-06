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
          enter: "opacity-0",
          enterDone: "opacity-1 backdrop-blur-sm transition ease-linear",
          exit: "opacity-0 backdrop-blur-none transition ease-out",
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
          className="z-100 fixed inset-0 flex justify-center bg-slate-400/20"
          {...underlayProps}
        >
          <div
            {...modalProps}
            className="z-1 dark:border-textSecondaryDark border-textSecondary relative top-[10%] h-fit border-2 shadow-2xl focus:outline-none"
            ref={ref}
          >
            <button
              aria-label="close"
              className="border-textSecondary dark:border-textSecondaryDark bg-background dark:bg-backgroundDark absolute right-4 top-4 border shadow-lg hover:bg-red-500 hover:shadow-2xl"
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
