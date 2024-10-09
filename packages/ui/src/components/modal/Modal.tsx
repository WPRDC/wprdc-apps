/**
 *
 * Modal
 *
 * Overlayed content that takes focus and hides content below
 *
 **/
"use client";

import { Modal as RAModal } from "react-aria-components";
import type { ModalProps } from "./Modal.types";
import { twMerge } from "tailwind-merge";

export function Modal({ children, ...props }: ModalProps): React.ReactElement {
  return (
    <RAModal
      {...props}
      className={({ isEntering, isExiting }) =>
        twMerge(
          `lg:mx-w-screen-md w-full overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl xl:max-w-screen-lg`,
          isEntering && "animate-in zoom-in-95 duration-300 ease-out",
          isExiting && "animate-out zoom-out-95 duration-200 ease-in",
        )
      }
    >
      {children}
    </RAModal>
  );
}
