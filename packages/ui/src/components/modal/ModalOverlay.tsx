"use client";

import { ModalOverlay as RAModalOverlay } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { ModalOverlayProps } from "./Modal.types";

export function ModalOverlay(props: ModalOverlayProps): React.ReactElement {
  return (
    <RAModalOverlay
      {...props}
      className={({ isEntering, isExiting }) =>
        twMerge(
          `fixed inset-0 z-50 flex min-h-full items-center justify-center overflow-y-auto bg-black/25 p-4 text-center backdrop-blur`,
          isEntering && "animate-in fade-in duration-300 ease-out",
          isExiting && "animate-out fade-out duration-200 ease-in",
        )
      }
    />
  );
}
