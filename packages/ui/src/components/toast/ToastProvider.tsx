"use client";

import { useToastState } from "@react-stately/toast";
import { type ReactElement, type ReactNode } from "react";
import { ToastRegion } from "./ToastRegion";
import { type ToastProviderProps } from "./Toast.types.ts";

export function ToastProvider<T extends ReactNode>({
  children,
  ...props
}: ToastProviderProps<T>): ReactElement {
  const state = useToastState<T>({
    maxVisibleToasts: 5,
  });

  return (
    <>
      {children(state)}
      {state.visibleToasts.length > 0 && (
        <ToastRegion {...props} state={state} />
      )}
    </>
  );
}
