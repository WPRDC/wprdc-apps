export function getClassificationColor(classification: string): string {
  switch (classification) {
    case "RESIDENTIAL":
      return "#14532d";
    case "COMMERCIAL":
      return "#1e40af";
    case "INDUSTRIAL":
      return "#92400e";
    case "AGRICULTURAL":
      return "#987606";
    case "GOVERNMENT":
      return "#a21caf";
    case "OTHER":
      return "#44403c";
    case "UTILITIES":
      return "#5b21b6";
    default:
      return "#44403c";
  }
}
