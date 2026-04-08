import type { TaxLienWithCurrentStatus } from "@wprdc/types";
import {
  A,
  Chip,
  DataListViz,
  formatDate,
  formatDollars,
  SingleValueVizCollection,
  Typography,
} from "@wprdc/ui";
import type { SectionProps } from "../types";
import {
  DetailList,
  DetailListItem,
} from "@/components/parcel-dashboard/components/detail-list.tsx";

export function TaxLiensSection({
  fields,
  records,
}: SectionProps<TaxLienWithCurrentStatus>): React.ReactElement {
  if (!records.length) return <Typography.Note>No liens found</Typography.Note>;

  // group by dtd
  const groupedRecords = records.reduce(
    (grouped, record) => {
      const dtd = record.dtd;
      if (!grouped[dtd]) grouped[dtd] = [];
      grouped[dtd].push(record);
      return grouped;
    },
    {} as Record<string, TaxLienWithCurrentStatus[]>,
  );

  // sort by filing date
  const sortedGroupedRecords = Object.entries(groupedRecords).map(
    ([dtd, records]) => ({
      dtd,
      records: records.sort(
        (a, b) => Date.parse(b.filing_date) - Date.parse(a.filing_date),
      ),
    }),
  );

  // total value of liens
  const sum = records.reduce((acc, record) => acc + record.amount, 0);

  const items: DetailListItem[] = sortedGroupedRecords.map(
    ({ dtd, records }) => ({
      title: dtd,
      subtitle: formatDollars(
        records.reduce((acc, record) => acc + record.amount, 0),
      ),
      topLeft: formatDate(records[0].filing_date),
      topRight: (
        <Chip
          variant={records[0].satisfied ? "success" : "warning"}
          label={records[0].satisfied ? "Satisfied" : "Unsatisfied"}
        />
      ),
      details: (
        <div>
          <div>
            <SingleValueVizCollection
              items={[
                {
                  id: "total_amount",
                  label: "Total Amount",
                  value: formatDollars(
                    records.reduce((acc, record) => acc + record.amount, 0),
                  ),
                },
              ]}
            />
          </div>
          <div className="mt-2.5 mb-2 font-bold">
            {records.length} Record{records.length === 1 ? "" : "s"}
          </div>
          <div className="flex flex-col space-y-2">
            {records.map((record) => (
              <DataListViz
                key={record.filing_date}
                items={[
                  {
                    id: "dtd",
                    label: "Docket",
                    info: fields.dtd.info?.notes,
                    value: record.dtd,
                  },
                  {
                    id: "filing_date",
                    label: "Filing Date",
                    info: fields.filing_date.info?.notes,
                    value: formatDate(record.filing_date),
                  },
                  {
                    id: "tax_year",
                    label: "Tax Year",
                    info: fields.tax_year.info?.notes,
                    value: record.tax_year,
                  },
                  {
                    id: "amount",
                    label: "Amount",
                    info: fields.amount.info?.notes,
                    value: formatDollars(record.amount),
                  },
                  {
                    id: "assignee",
                    label: "Holder of Lien",
                    info: fields.assignee.info?.notes,
                    value: record.assignee,
                  },
                  {
                    id: "status",
                    label: "Status",
                    info: fields.satisfied.info?.notes,
                    value: record.satisfied ? "Satisfied" : "Unsatisfied",
                  },
                ]}
              />
            ))}
          </div>
          <A
            className="mt-2 mb-1"
            variant="button"
            buttonVariant="primary"
            href={`https://dcr.alleghenycounty.us/Civil/View/PublicSearchByCaseNumber.aspx?CasID=${dtd}`}
          >
            See details in court records website
          </A>
          <Typography.Note>
            The Court Records site will require you to pass a CAPTCHA to access
            the details. Once you complete the CAPTCHA, this link will take you
            to the details page.
          </Typography.Note>
        </div>
      ),
    }),
  );

  return (
    <div>
      <div>
        <div className="max-w-md">
          <SingleValueVizCollection
            items={[
              {
                id: "number_of_liens",
                label: "# Liens",
                value: records.length,
              },
              {
                id: "number_unsatisfied",
                label: "# Unsatisfied",
                value: records.filter((record) => !record.satisfied).length,
              },
              {
                id: "total_value",
                label: "Total Value",
                value: sum,
                format: formatDollars,
              },
            ]}
          />
        </div>
      </div>
      <div>
        <DetailList items={items} />
      </div>
    </div>
  );
}
