/**
 *
 * Input types
 *
 **/
import type * as React from "react";
import { type InputProps as RAInputProps } from "react-aria-components";

export interface InputProps
  extends RAInputProps,
    React.RefAttributes<HTMLInputElement> {
  className?: string;
}
