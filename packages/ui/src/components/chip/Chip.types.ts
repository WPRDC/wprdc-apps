import type { ReactNode } from "react";
import type { IconType } from "react-icons/lib";

export interface ChipProps {
  label: string;
  icon?: IconType;
  variant?: "default" | "info" | "success" | "warning" | "danger";
  info?: ReactNode;
  color?: string;
  textColor?: string;
  className?: string;
}
