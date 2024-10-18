import {
  PiCheckFatFill,
  PiWarningCircleDuotone,
  PiWarningDuotone,
  PiWarningOctagonDuotone,
} from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import type { ChipProps } from "./Chip.types";

export function Chip({
  label,
  icon,
  size = "M",
  variant = "default",
  color,
  textColor,
  info,
  inline = false,
  className,
}: ChipProps): React.ReactElement {
  const Icon = icon;

  const Elem = inline ? "span" : "div";

  return (
    <Elem
      className={twMerge(
        "items-start font-mono text-xs uppercase",
        inline ? "inline-flex" : "flex",
        className,
      )}
    >
      <span
        className={twMerge(
          "flex w-fit items-center space-x-1 rounded-md border-2 px-1 font-semibold not-italic",
          size === "S" && "border font-medium",
          variant === "default" && "",
          variant === "success" && "border-green-900 bg-green-300/70",
          variant === "warning" && "border-orange-900 bg-orange-300/70",
          variant === "danger" && "border-red-900 bg-red-400/70",
          variant === "info" && "border-blue-900 bg-blue-400/70",
        )}
        style={{ background: color, color: textColor, borderColor: textColor }}
      >
        {!!Icon && <Icon />}
        {!Icon && variant === "success" && <PiCheckFatFill />}
        {!Icon && variant === "info" && <PiWarningCircleDuotone />}
        {!Icon && variant === "warning" && <PiWarningDuotone />}
        {!Icon && variant === "danger" && <PiWarningOctagonDuotone />}
        <span>{label}</span>
      </span>
    </Elem>
  );
}
