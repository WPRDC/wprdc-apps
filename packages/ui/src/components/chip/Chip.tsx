import { twMerge } from "tailwind-merge";
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
        "flex items-start font-mono text-sm font-semibold uppercase",
        className,
      )}
    >
      <div
        className={twMerge(
          "flex w-fit items-center space-x-1 rounded-md border-2 px-1",
          variant === "default" && "",
          variant === "active" && "border-leafgreen bg-lightgreen/70",
          variant === "disabled" && "text-stone-200",
          variant === "error" && "",
        )}
        style={{ background: color, color: textColor, borderColor: textColor }}
      >
        {!!Icon && (
          <div>
            <Icon />
          </div>
        )}
        <div>{label}</div>
      </div>
      {!!info && <InfoTooltip info={info} />}
    </div>
  );
}
