import type { ForeclosureFiling } from "@wprdc/types";
import { FieldValues, Typography } from "../../../components";
import { RecordSection } from "../components/RecordSection";
import type { SectionProps } from "../types";

export function ForeclosureFilingSection({
  fields,
  records,
}: SectionProps<ForeclosureFiling>): React.ReactElement {
  if (!records.length)
    return <Typography.Note>No petitions found</Typography.Note>;

  return (
    <div>
      {records.map((record) => (
        <RecordSection key={`${record.case_id}${record.filing_date}`}>
          <FieldValues
            fields={fields}
            items={[
              "filing_date",
              "case_id",
              "docket_type",
              "amount",
              "plaintiff",
              "last_activity",
            ]}
            record={record}
            variant="dense"
          />
        </RecordSection>
      ))}
    </div>
  );
}
