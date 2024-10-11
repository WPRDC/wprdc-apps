export function getClassificationColor(classification: string): string {
  switch (classification) {
    case "RESIDENTIAL":
      return "#facc15";
    case "COMMERCIAL":
      return "#f87171";
    case "INDUSTRIAL":
      return "#a78bfa";
    case "AGRICULTURAL":
      return "#22c55e";
    case "GOVERNMENT":
      return "#60a5fa";
    case "OTHER":
      return "#BEBEBE";
    case "UTILITIES":
      return "#22d3ee";
    default:
      return "#FFF";
  }
}
