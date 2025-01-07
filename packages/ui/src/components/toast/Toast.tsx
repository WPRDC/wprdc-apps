"use client";

import { useToast } from "@react-aria/toast";
import { Button } from "react-aria-components";
import React, { type ReactElement } from "react";
import { BiX } from "react-icons/bi";
import { type ToastProps } from "./Toast.types";

// Reuse the Button from your component library. See below for details.

export function Toast<T extends React.ReactNode>({
  state,
  ...props
}: ToastProps<T>): ReactElement {
  const ref = React.useRef(null);
  const { toastProps, contentProps, titleProps, closeButtonProps } = useToast(
    props,
    state,
    ref,
  );

  return (
    <div
      {...toastProps}
      ref={ref}
      className="flex items-center space-x-1 rounded-sm border border-black bg-primary/75 py-1 pl-2 pr-1 font-medium shadow-sm backdrop-blur-sm"
    >
      <div {...contentProps}>
        <div {...titleProps}>{props.toast.content}</div>
      </div>
      <Button
        className="flex h-full items-center justify-center"
        {...closeButtonProps}
      >
        <BiX className="size-5" />
      </Button>
    </div>
  );
}
