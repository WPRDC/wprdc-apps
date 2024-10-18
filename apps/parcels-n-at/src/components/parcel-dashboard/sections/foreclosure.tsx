import type { ForeclosureFiling } from "@wprdc/types";
import { DataListViz, Typography } from "@wprdc/ui";
import type { SectionProps } from "../types.ts";
import { Card } from "../components/card";
import { CardList } from "../components/card-list";

export function ForeclosureFilingSection({
  fields,
  records,
}: SectionProps<ForeclosureFiling>): React.ReactElement {
  if (!records.length)
    return <Typography.Note>No petitions found</Typography.Note>;

  return (
    <CardList>
      {records.map((record) => (
        <Card>
          <article>
            <h3 className="mb-1 text-2xl font-bold">
              <span>Case #:</span>{" "}
              <span className="font-mono">{record.case_id}</span>
            </h3>
            <DataListViz
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
          </article>
        </Card>
      ))}
    </CardList>
  );
}
