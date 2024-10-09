import type { PropertyAssessment } from "@wprdc/types";
import { useMemo } from "react";
import { Table } from "../../../components";
import { formatDollars } from "../../../util";
import type { SectionProps } from "../types";

export function AssessedValuesSection({
  records,
}: SectionProps<PropertyAssessment>): React.ReactElement {
  const record = records[0];

  const notation: Intl.NumberFormatOptions["notation"] = useMemo(
    () =>
      record.FAIRMARKETTOTAL && record.FAIRMARKETTOTAL >= 10_000_000
        ? "compact"
        : "standard",
    [record.FAIRMARKETTOTAL],
  );

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
        formatDollars(v, { notation, compactDisplay: "long" })
      }
      rows={["Local", "County", "Fair Market"]}
    />
  );
}
