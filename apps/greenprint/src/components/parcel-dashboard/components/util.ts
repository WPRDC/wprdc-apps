import chroma from "chroma-js";

export function getClassificationColor(
  classification: string,
  dark: boolean = false,
): string {
  let color: string;
  switch (classification) {
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
    case "UTILITIES":
      color = "#22d3ee";
      break;
    case "OTHER":
      color = "#BEBEBE";
      break;
    default:
      color = "#BEBEBE";
      break;
  }

  if (dark) {
    return chroma(color).darken(2).hex();
  }
  return color;
}

