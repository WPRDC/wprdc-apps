/**
 *
 * Button types
 *
 **/
import type { ButtonProps as RAButtonProps } from "react-aria-components";

export interface ButtonProps extends RAButtonProps {
  dense?: boolean;
  variant?: "default" | "primary" | "secondary" | "borderless" | "success";
  className?: string;
  children?: React.ReactNode;
}
