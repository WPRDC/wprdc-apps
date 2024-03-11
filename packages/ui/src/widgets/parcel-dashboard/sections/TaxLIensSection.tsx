import type { TaxLienWithCurrentStatus } from "@wprdc/types";
import { FieldValues, Typography } from "../../../components";
import { RecordSection } from "../components/RecordSection";
import type { SectionProps } from "../types";

export function TaxLiensSection({
  fields,
  records,
}: SectionProps<TaxLienWithCurrentStatus>): React.ReactElement {
  if (!records.length) return <Typography.Note>No liens found</Typography.Note>;

  return (
    <div>
      {records
        .sort((a, b) => Date.parse(b.filing_date) - Date.parse(a.filing_date))
        .map((record) => (
          <RecordSection key={`${record.filing_date}${record.dtd}`}>
            <FieldValues
              fields={fields}
              items={[
                "dtd",
                "filing_date",
                "tax_year",
                "lien_description",
                "last_docket_entry",
                "amount",
                "assignee",
                "satisfied",
              ]}
              record={record}
              variant="dense"
            />
          </RecordSection>
        ))}
    </div>
  );
}
