/**
 *
 * Toast types
 *
 **/
import type * as React from "react";
import type { AriaToastProps, AriaToastRegionProps } from "@react-aria/toast";
import type { ToastState } from "@react-stately/toast";

export type { ToastState };

export interface ToastRegionProps<T> extends AriaToastRegionProps {
  state: ToastState<T>;
}

export interface ToastProps<T> extends AriaToastProps<T> {
  state: ToastState<T>;
}

export interface ToastProviderProps<T>
  extends Omit<ToastRegionProps<T>, "state"> {
  children: (state: ToastState<T>) => React.ReactNode;
}
