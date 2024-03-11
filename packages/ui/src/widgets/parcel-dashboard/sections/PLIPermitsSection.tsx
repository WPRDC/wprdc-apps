import type { PLIPermit } from "@wprdc/types";
import { FieldValues, Typography } from "../../../components";
import { RecordSection } from "../components/RecordSection";
import type { SectionProps } from "../types";

export function PLIPermitsSection({
  fields,
  records,
}: SectionProps<PLIPermit>): React.ReactElement {
  if (!records.length)
    return <Typography.Note>Not permits found</Typography.Note>;

  const record = records[0];

  return (
    <RecordSection key={record.permit_id}>
      <FieldValues
        fields={fields}
        items={[
          "permit_id",
          "issue_date",
          "permit_type",
          "work_type",
          "total_project_value",
        ]}
        record={record}
        variant="dense"
      />
      <FieldValues
        denseLabel
        fields={fields}
        items={["contractor_name", "work_description"]}
        record={record}
      />
    </RecordSection>
  );
}
