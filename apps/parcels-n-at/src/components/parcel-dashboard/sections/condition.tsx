import type { PropertyAssessment } from "@wprdc/types";
import { PositionViz } from "@wprdc/ui";
import type { SectionProps } from "../types";
import { ClassChip } from "@/components/parcel-dashboard/components/ClassChip";

export function ConditionSection({
  fields,
  records,
}: SectionProps<PropertyAssessment>): React.ReactElement {
  const record = records[0];

  if (!record.GRADEDESC) {
    return (
      <div className="text-sm italic">
        <p>Grade and Condition data aren&apos;t available for this parcel.</p>
        <p>
          They are currently only available for{" "}
          <ClassChip inline parcelClass="RESIDENTIAL" size="S" /> properties.
        </p>
      </div>
    );
  }

  return (
    <div className="grid w-fit grid-cols-3 gap-4">
      <div>
        <PositionViz
          id="grade"
          options={[
            { label: "POOR -", halfStep: true },
            { label: "POOR" },
            { label: "POOR +", halfStep: true },
            { label: "BELOW AVERAGE -", halfStep: true },
            { label: "BELOW AVERAGE" },
            { label: "BELOW AVERAGE +", halfStep: true },
            { label: "AVERAGE -", halfStep: true },
            { label: "AVERAGE" },
            { label: "AVERAGE +", halfStep: true },
            { label: "GOOD -", halfStep: true },
            { label: "GOOD" },
            { label: "GOOD +", halfStep: true },
            { label: "VERY GOOD -", halfStep: true },
            { label: "VERY GOOD" },
            { label: "VERY GOOD +", halfStep: true },
            { label: "EXCELLENT -", halfStep: true },
            { label: "EXCELLENT" },
            { label: "EXCELLENT +", halfStep: true },
            { label: "Highest Cost -", halfStep: true },
            { label: "Highest Cost" },
            { label: "Highest Cost +", halfStep: true },
          ].reverse()}
          className="capitalize"
          label="Building Grade"
          info={fields.GRADE.info?.notes}
          value={record.GRADEDESC}
        />
      </div>

      <div>
        <PositionViz
          id="condition"
          options={[
            "UNSOUND",
            "VERY POOR",
            "POOR",
            "FAIR",
            "AVERAGE",
            "GOOD",
            "VERY GOOD",
            "EXCELLENT",
          ].reverse()}
          label="Condition"
          info={fields.CONDITION.info?.notes}
          value={record.CONDITIONDESC}
        />
      </div>

      <div>
        <PositionViz
          id="cdu"
          options={[
            "UNSOUND",
            "VERY POOR",
            "POOR",
            "FAIR",
            "AVERAGE",
            "GOOD",
            "VERY GOOD",
            "EXCELLENT",
          ].reverse()}
          label="CDU"
          info={fields.CDU.info?.notes}
          value={record.CDUDESC}
        />
      </div>
    </div>
  );
}
