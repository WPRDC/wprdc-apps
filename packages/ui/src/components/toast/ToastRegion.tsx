"use client";

import { useToastRegion } from "@react-aria/toast";
import { type ReactElement, useRef } from "react";
import { type ToastRegionProps } from "./Toast.types.ts";
import { Toast } from "./Toast.tsx";

export function ToastRegion<T extends React.ReactNode>({
  state,
  ...props
}: ToastRegionProps<T>): ReactElement {
  const ref = useRef(null);
  const { regionProps } = useToastRegion(props, state, ref);

  return (
    <div
      {...regionProps}
      ref={ref}
      className="toast-region fixed bottom-8 right-1/2 flex flex-col space-y-4"
    >
      {state.visibleToasts.map((toast) => (
        <Toast key={toast.key} toast={toast} state={state} />
      ))}
    </div>
  );
}
