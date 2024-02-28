/**
 *
 * Modal
 *
 * Overlayed content that takes focus and hides content below
 *
 **/
import { Modal as RAModal } from "react-aria-components";
import type { ModalProps } from "./Modal.types";

export function Modal(props: ModalProps): React.ReactElement {
  return (
    <RAModal
      {...props}
      className={({ isEntering, isExiting }) => `
            w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl
            ${isEntering ? "animate-in zoom-in-95 duration-300 ease-out" : ""}
            ${isExiting ? "animate-out zoom-out-95 duration-200 ease-in" : ""}
          `}
    />
  );
}
