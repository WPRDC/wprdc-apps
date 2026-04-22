import type { ConservatorshipRecord } from "@wprdc/types";
import { DataListViz, Typography } from "@wprdc/ui";
import type { SectionProps } from "../types";
import { CardList } from "@/components/parcel-dashboard/components/card-list";
import { Card } from "@/components/parcel-dashboard/components/card";

export function ConservatorshipRecordSection({
  fields,
  records,
}: SectionProps<ConservatorshipRecord>): React.ReactElement {
  if (!records.length)
    return <Typography.Note>No petitions found</Typography.Note>;

  return (
    <CardList>
      {records.map((record) => (
        <Card key={`${record.case_id}${record.filing_date}`}>
          <article>
            <h3 className="mb-1 text-2xl font-bold">
              <span>Case #:</span>{" "}
              <span className="font-mono">{record.case_id}</span>
            </h3>
            <DataListViz
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
          </article>
        </Card>
      ))}
    </CardList>
  );
}
