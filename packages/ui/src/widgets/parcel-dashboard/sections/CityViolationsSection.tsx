import type { CityViolation } from "@wprdc/types";
import { FieldValues, Typography } from "../../../components";
import { RecordSection } from "../components/RecordSection";
import type { SectionProps } from "../types";

export function CityViolationsSection({
  records,
}: SectionProps<CityViolation>): React.ReactElement {
  if (!records.length)
    return <Typography.Note>No violations found</Typography.Note>;
  return (
    <div>
      {records.map((record) => (
        <RecordSection
          key={`${record.casefile_number}${record.investigation_date}`}
        >
          <FieldValues
            items={[
              {
                id: "casefile_number",
                label: "Casefile Number",
                value: record.casefile_number,
              },
              {
                id: "investigation_date",
                label: "Investigation Date",
                value: record.investigation_date,
              },

              {
                id: "violation_code_section",
                label: "Violation Code Section",
                value: record.violation_code_section,
              },

              {
                id: "investigation_outcome",
                label: "Investigation Outcome",
                value: record.investigation_outcome,
              },
            ]}
            variant="dense"
          />
          <FieldValues
            denseLabel
            items={[
              {
                id: "violation_description",
                label: "Violation Description",
                value: record.violation_description,
              },
              {
                id: "violation_spec_instructions",
                label: "Violation Spec Instructions",
                value: record.violation_spec_instructions,
              },
              {
                id: "investigation_findings",
                label: "Investigation Findings",
                value: record.investigation_findings,
              },
            ]}
          />
        </RecordSection>
      ))}
    </div>
  );
}
