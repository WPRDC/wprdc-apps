import { twMerge } from "tailwind-merge";
import {
  PiCheckFatFill,
  PiWarningCircleDuotone,
  PiWarningDuotone,
  PiWarningOctagonDuotone,
} from "react-icons/pi";
import { InfoTooltip } from "../tooltip";
import type { ChipProps } from "./Chip.types";

export function Chip({
  label,
  icon,
  variant = "default",
  color,
  textColor,
  info,
  className,
}: ChipProps): React.ReactElement {
  const Icon = icon;
  return (
    <div
      className={twMerge(
        "flex items-start font-mono text-xs font-semibold uppercase",
        className,
      )}
    >
      <div
        className={twMerge(
          "flex w-fit items-center space-x-1 rounded-md border-2 px-1",
          variant === "default" && "",
          variant === "success" && "border-green-900 bg-green-400/70",
          variant === "warning" && "border-orange-900 bg-orange-400/70",
          variant === "danger" && "border-red-900 bg-red-400/70",
          variant === "info" && "border-blue-900 bg-blue-400/70",
        )}
        style={{ background: color, color: textColor, borderColor: textColor }}
      >
        {!!Icon && (
          <div>
            <Icon />
          </div>
        )}
        {!Icon && variant === "success" && <PiCheckFatFill />}
        {!Icon && variant === "info" && <PiWarningCircleDuotone />}
        {!Icon && variant === "warning" && <PiWarningDuotone />}
        {!Icon && variant === "danger" && <PiWarningOctagonDuotone />}
        <div>{label}</div>
      </div>
      {!!info && <InfoTooltip info={info} />}
    </div>
  );
}
