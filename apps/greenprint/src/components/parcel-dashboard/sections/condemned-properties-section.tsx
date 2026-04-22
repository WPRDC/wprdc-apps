import type { CondemnedProperties } from "@wprdc/types";
import { SingleValueVizCollection, Typography } from "@wprdc/ui";
import type { SectionProps } from "../types";

export function CondemnedPropertiesSection({
  fields,
  records,
}: SectionProps<CondemnedProperties>): React.ReactElement {
  if (!records.length)
    return <Typography.Note>No condemnation record found.</Typography.Note>;

  const record = records[0];

  return (
    <div>
      <SingleValueVizCollection
        items={[
          {
            id: "property-type",
            label: "Property Type",
            value: record.property_type,
            info: fields.property_type.info?.notes,
          },
          {
            id: "date",
            label: "Date",
            value: record.date,
            info: fields.date.info?.notes,
          },
          {
            id: "latest_inspection_result",
            label: "Latest Inspection Result",
            value: record.latest_inspection_result,
            info: fields.latest_inspection_result.info?.notes,
          },
          {
            id: "latest_inspection_score",
            label: "Latest Inspection Score",
            value: record.latest_inspection_score,
            info: fields.latest_inspection_score.info?.notes,
          },
          {
            id: "inspection_status",
            label: "Inspection Status",
            value: record.inspection_status,
            info: fields.inspection_status.info?.notes,
          },
        ]}
      />
    </div>
  );
}
