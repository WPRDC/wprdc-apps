import type { PropertyAssessment } from "@wprdc/types";
import { FieldValues } from "../../../components";
import type { SectionProps } from "../types";

export function LotAreaSection({
  fields,
  records,
}: SectionProps<PropertyAssessment>): React.ReactElement {
  const record = records[0];
  return (
    <FieldValues
      items={[
        {
          id: "lot-area",
          label: undefined,
          value: (
            <span>
              {record.LOTAREA} ft<sup>2</sup>
            </span>
          ),
        },
      ]}
    />
  );
}
