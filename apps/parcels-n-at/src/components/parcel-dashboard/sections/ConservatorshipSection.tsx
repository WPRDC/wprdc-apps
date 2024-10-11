import type { ConservatorshipRecord } from "@wprdc/types";
import { FieldValues, Typography } from "../../../components";
import { RecordSection } from "../components/RecordSection";
import type { SectionProps } from "../types";

export function ConservatorshipRecordSection({
  fields,
  records,
}: SectionProps<ConservatorshipRecord>): React.ReactElement {
  if (!records.length)
    return <Typography.Note>No petitions found</Typography.Note>;

  return (
    <div>
      {records.map((record) => (
        <RecordSection key={`${record.case_id}${record.filing_date}`}>
          <FieldValues
            fields={fields}
            items={[
              "case_id",
              "filing_date",
              "party_type",
              "party_name",
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
