/**
 *
 * Button types
 *
 **/
import type { ButtonProps as RAButtonProps } from "react-aria-components";

export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "borderless"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface ButtonProps extends RAButtonProps {
  dense?: boolean;
  variant?: ButtonVariant;
  className?: string;
  children?: React.ReactNode;
}
