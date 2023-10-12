/**
 *
 * Button types
 *
 **/
import type { AriaButtonProps } from "@react-types/button";
import type { RefObject } from "react";

export interface ButtonProps extends AriaButtonProps {
  dense?: boolean;
  variant?: "default" | "primary" | "secondary" | "borderless" | "success";
  buttonRef?: RefObject<HTMLButtonElement>;
  className?: string;
}
