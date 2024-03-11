import type { PropertyAssessment } from "@wprdc/types";
import { Table } from "../../../components";
import type { SectionProps } from "../types";

export function AssessedValuesSection({
  records,
}: SectionProps<PropertyAssessment>): React.ReactElement {
  const record = records[0];

  return (
    <Table<number>
      columns={["Building", "Land", "Total"]}
      data={[
        [record.LOCALBUILDING, record.LOCALLAND, record.LOCALTOTAL],
        [record.COUNTYBUILDING, record.COUNTYLAND, record.COUNTYTOTAL],
        [
          record.FAIRMARKETBUILDING,
          record.FAIRMARKETLAND,
          record.FAIRMARKETTOTAL,
        ],
      ]}
      format={(v?: number) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(v ?? 0)
      }
      rows={["Local", "County", "Fair Market"]}
    />
  );
}
