import type { TaxLienWithCurrentStatus } from "@wprdc/types";
import {
  DataListViz,
  formatDollars,
  SingleValueVizCollection,
  Typography,
} from "@wprdc/ui";
import type { SectionProps } from "../types.ts";
import { TbCaretDown, TbCaretRight } from "react-icons/tb";
import { CardList } from "@/components/parcel-dashboard/components/card-list.tsx";
import { Card } from "@/components/parcel-dashboard/components/card.tsx";

export function TaxLiensSection({
  fields,
  records,
}: SectionProps<TaxLienWithCurrentStatus>): React.ReactElement {
  if (!records.length) return <Typography.Note>No liens found</Typography.Note>;

  return (
    <CardList>
      {records
        .sort((a, b) => Date.parse(b.filing_date) - Date.parse(a.filing_date))
        .map((record) => (
          <Card key={record.dtd}>
            <article className="space-y-4">
              <h3 className="mb-1 text-2xl font-bold">
                <span>Docket #:</span>{" "}
                <span className="font-mono">{record.dtd}</span>
              </h3>
              <SingleValueVizCollection
                items={[
                  {
                    id: "tax_year",
                    label: fields.tax_year.info?.label,
                    value: record.tax_year,
                    info: fields.tax_year.info?.notes,
                  },
                  {
                    id: "amount",
                    label: fields.amount.info?.label,
                    value: record.amount,
                    format: formatDollars,
                    info: fields.amount.info?.notes,
                  },
                ]}
              />
              <details className="group">
                <summary className="group/summary flex w-fit cursor-pointer list-none items-center decoration-2 hover:text-stone-800">
                  <TbCaretRight className="block size-5 group-open:hidden"></TbCaretRight>
                  <TbCaretDown className="hidden size-5 group-open:block"></TbCaretDown>
                  <h4 className="group-hover/summary:bg-primary -ml-1 px-1 text-xl font-bold">
                    Details
                  </h4>
                </summary>
                <div className="ml-2 box-content border-l-4 border-stone-600 p-3.5 pr-0">
                  <DataListViz
                    fields={fields}
                    items={[
                      "filing_date",
                      "lien_description",
                      "last_docket_entry",
                      "assignee",
                      "satisfied",
                    ]}
                    record={record}
                    variant="dense"
                  />
                </div>
              </details>
            </article>
          </Card>
        ))}
    </CardList>
  );
}
