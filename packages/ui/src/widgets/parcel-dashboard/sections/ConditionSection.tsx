import type { PropertyAssessment } from "@wprdc/types";
import { FieldValues } from "../../../components";
import type { SectionProps } from "../types";

export function ConditionSection({
  fields,
  records,
}: SectionProps<PropertyAssessment>): React.ReactElement {
  const record = records[0];

  return (
    <FieldValues
      emptyMessage="Not available for this parcel"
      items={[
        {
          id: "grade",
          label: "Grade",
          info: fields.GRADE.info?.notes,
          value: record.GRADEDESC,
        },
        {
          id: "condition",
          label: "Condition",
          info: fields.CONDITION.info?.notes,
          value: record.CONDITIONDESC,
        },
        {
          id: "cdu",
          label: "CDU",
          info: fields.CDU.info?.notes,
          value: record.CDUDESC,
        },
      ]}
      variant="dense"
    />
  );
}
