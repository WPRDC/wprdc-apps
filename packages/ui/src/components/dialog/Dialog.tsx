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
import { TbX } from "react-icons/tb";
import { Button } from "../button";

export function Dialog({
  children,
  className,
  ...props
}: DialogProps): React.ReactElement {
  return (
    <RADialog
      {...props}
      className={twMerge("relative rounded-md p-2 flex flex-col", className)}
    >
      <div className="overflow-auto">{children}</div>
      <div className="flex justify-end mt-3">
        <Button slot="close" size="sm" icon={TbX}>Close</Button>
      </div>
    </RADialog>
  );
}
