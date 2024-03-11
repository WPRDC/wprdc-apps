import type { PropsWithChildren } from "react";
import { Chip } from "../../../components";

interface ClassChipProps extends PropsWithChildren {
  parcelClass?: string;
}

export function ClassChip({
  parcelClass,
}: ClassChipProps): null | React.ReactElement {
  let color = "#eee";
  const textColor = "#000";
  if (!parcelClass) return null;

  switch (parcelClass) {
    case "RESIDENTIAL":
      color = "#facc15";
      break;
    case "COMMERCIAL":
      color = "#f87171";
      break;
    case "INDUSTRIAL":
      color = "#a78bfa";
      break;
    case "AGRICULTURAL":
      color = "#22c55e";
      break;
    case "GOVERNMENT":
      color = "#60a5fa";
      break;
    case "OTHER":
      color = "#BEBEBE";
      break;
    case "UTILITIES":
      color = "#22d3ee";
      break;
  }

  return (
    <Chip
      className="text-xs"
      color={color}
      label={parcelClass}
      textColor={textColor}
    />
  );
}
