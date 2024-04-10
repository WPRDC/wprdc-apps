import type { IconType } from "react-icons/lib/cjs/iconBase";
import type { ReactNode } from "react";

export interface ChipProps {
  label: string;
  icon?: IconType;
  variant?: "default" | "info" | "success" | "warning" | "danger";
  info?: ReactNode;
  color?: string;
  textColor?: string;
  className?: string;
}
