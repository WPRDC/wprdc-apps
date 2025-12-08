/**
 *
 * Modal
 *
 * Overlaid content that takes focus and hides content below
 *
 **/
"use client";

import { Modal as RAModal } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { ModalProps } from "./Modal.types";

export function Modal({
  children,
  className,
  ...props
}: ModalProps): React.ReactElement {
  return (
    <RAModal
      {...props}
      className={({ isEntering, isExiting }) =>
        twMerge(
          `lg:mx-w-screen-md w-fit overflow-hidden rounded border-2 border-black bg-white p-6 text-left align-middle shadow-xl xl:max-w-(--breakpoint-lg)`,
          isEntering && "duration-300 ease-out animate-in zoom-in-95",
          isExiting && "duration-200 ease-in animate-out zoom-out-95",
          className,
        )
      }
    >
      {children}
    </RAModal>
  );
}
