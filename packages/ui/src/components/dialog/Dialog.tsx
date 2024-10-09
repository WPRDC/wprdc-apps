/**
 *
 * Dialog
 *
 * Overlaid content that takes focus and hides content below
 *
 **/
"use client";

import { Dialog as RADialog } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { DialogProps } from "./Dialog.types";

export function Dialog({
  children,
  className,
  ...props
}: DialogProps): React.ReactElement {
  return (
    <RADialog
      {...props}
      className={twMerge(
        "relative rounded-md border border-black p-2",
        className,
      )}
    >
      {children}
    </RADialog>
  );
}
