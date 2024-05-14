/**
 *
 * Dialog
 *
 * Overlaid content that takes focus and hides content below
 *
 **/
"use client";

import { Dialog as RADialog } from "react-aria-components";
import type { DialogProps } from "./Dialog.types";

export function Dialog({
  children,
  ...props
}: DialogProps): React.ReactElement {
  return (
    <RADialog {...props} className="relative outline-none">
      {children}
    </RADialog>
  );
}
