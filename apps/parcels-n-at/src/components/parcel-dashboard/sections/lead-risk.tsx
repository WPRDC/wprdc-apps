import type { MultiSourceSectionProps } from "../types";
import { PropertyAssessment } from "@wprdc/types";

export function LeadRiskSection({
  assessment,
}: MultiSourceSectionProps<{
  assessment: PropertyAssessment;
}>): React.ReactElement {
  return <div className="max-w-lg"></div>;
}
