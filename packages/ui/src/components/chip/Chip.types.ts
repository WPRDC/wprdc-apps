import type { ReactNode } from "react";
import type { IconType } from "react-icons/lib";
import { type Size } from "@wprdc/types";

export interface ChipProps {
  /** Text label displayed  in chip */
  label: string;

  /** Icon to use with chip label  */
  icon?: IconType;

  /** Set true for inline uses (uses no <div>s for use within <p> elements) */
  inline?: boolean;

  /** Size variants */
  size?: Size;

  /** Style variants */
  variant?: "default" | "info" | "success" | "warning" | "danger";

  /** Extra information about item represented by the chip. For tooltips. */
  info?: ReactNode;

  /** Color to use on background */
  color?: string;

  /** Color to use on text and border */
  textColor?: string;

  /** To customize style */
  className?: string;
}
