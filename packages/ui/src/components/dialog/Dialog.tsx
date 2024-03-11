/**
 *
 * Dialog
 *
 * Overlayed content that takes focus and hides content below
 *
 **/
"use client";

import {
  Dialog as RADialog,
  Heading as RAHeading,
} from "react-aria-components";
import type { DialogProps } from "./Dialog.types";

export function Dialog({
  heading,
  children,
  ...props
}: DialogProps): React.ReactElement {
  return (
    <RADialog {...props} className="relative outline-none">
      {() => (
        <>
          {heading ? <RAHeading slot="title">{heading}</RAHeading> : null}
          {children}
        </>
      )}
    </RADialog>
  );
}
