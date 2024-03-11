import type { FiledAssessmentAppeal } from "@wprdc/types";
import { FieldValues, Typography } from "../../../components";
import type { SectionProps } from "../types";

export function FiledAssessmentAppealsSection({
  fields,
  records,
}: SectionProps<FiledAssessmentAppeal>): React.ReactElement {
  if (!records.length)
    return <Typography.Note>No Records Found</Typography.Note>;
  const record = records[0];

  return (
    <FieldValues
      items={[
        {
          id: "on_behalf_of",
          label: fields.on_behalf_of.info?.label,
          info: fields.on_behalf_of.info?.notes,
          value: record.on_behalf_of,
        },
        {
          id: "hearing_status",
          label: fields.hearing_status.info?.label,
          info: fields.hearing_status.info?.notes,
          value: record.hearing_status,
        },
        {
          id: "prev_taxyr_mkt_value",
          label: fields.prev_taxyr_mkt_value.info?.label,
          info: fields.prev_taxyr_mkt_value.info?.notes,
          value: record.prev_taxyr_mkt_value,
        },
        {
          id: "cur_mkt_value",
          label: fields.cur_mkt_value.info?.label,
          info: fields.cur_mkt_value.info?.notes,
          value: record.cur_mkt_value,
        },
      ]}
      variant="dense"
    />
  );
}
