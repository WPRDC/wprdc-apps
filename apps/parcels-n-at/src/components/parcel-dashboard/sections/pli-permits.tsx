import type { PLIPermit } from "@wprdc/types";
import { DataListViz, formatDate, formatDollars, Typography } from "@wprdc/ui";
import type { SectionProps } from "../types";
import { Card } from "../components/card";
import { CardList } from "../components/card-list";

export function PLIPermitsSection({
  fields,
  records,
}: SectionProps<PLIPermit>): React.ReactElement {
  if (!records.length)
    return <Typography.Note>Not permits found</Typography.Note>;

  return (
    <CardList>
      {records
        .sort(
          (a, b) =>
            new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime(),
        )
        .map((record) => (
          <Card key={record.permit_id}>
            <article className="">
              <h3 className="mb-1 text-2xl font-bold">
                ID #: <span className="font-mono">{record.permit_id}</span>
              </h3>
              <div className="mt-3">
                <DataListViz
                  fields={fields}
                  items={[
                    {
                      id: "issue_date",
                      label: "Issue date",
                      info: fields.issue_date.info?.notes,
                      value: record.issue_date,
                      format: formatDate,
                    },
                    "permit_type",
                    "work_type",
                    {
                      id: "total_project_value",
                      label: "Total Project Value",
                      info: fields.total_project_value.info?.notes,
                      value: record.total_project_value,
                      format: formatDollars,
                    },
                  ]}
                  record={record}
                  variant="dense"
                />
                <DataListViz
                  fields={fields}
                  items={["contractor_name", "work_description"]}
                  record={record}
                />
              </div>
            </article>
          </Card>
        ))}
    </CardList>
  );
}
