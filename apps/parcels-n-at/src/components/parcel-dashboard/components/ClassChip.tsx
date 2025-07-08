import type { PropsWithChildren } from "react";
import { Chip } from "@wprdc/ui";
import { twMerge } from "tailwind-merge";
import { Size } from "@wprdc/types";
import { getClassificationColor } from "@/components/parcel-dashboard";

interface ClassChipProps extends PropsWithChildren {
  parcelClass?: string;
  className?: string;
  size?: Size;
  inline?: boolean;
}

export function ClassChip({
  parcelClass,
  size = "M",
  className,
  inline = false,
}: ClassChipProps): null | React.ReactElement {
  let color = "#eee";
  const textColor = "#000";
  if (!parcelClass) return null;
  color = getClassificationColor(parcelClass)


  return (
    <Chip
      inline={inline}
      size={size}
      className={twMerge("text-xs", className)}
      color={color}
      label={parcelClass}
      textColor={textColor}
    />
  );
}
