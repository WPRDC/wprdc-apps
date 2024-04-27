import type { PropertyAssessment } from "@wprdc/types";
import { TbHomeHeart, TbLeaf, TbPigMoney } from "react-icons/tb";
import { GiFarmTractor } from "react-icons/gi";
import { Chip, Typography } from "../../../components";
import type { SectionProps } from "../types";

export function SubsidiesSection({
  fields,
  records,
}: SectionProps<PropertyAssessment>): React.ReactElement {
  const record = records[0];

  return (
    <div>
      {!!record.HOMESTEADFLAG && (
        <Chip
          className="ml-1 inline-flex first:ml-0"
          icon={TbHomeHeart}
          info={fields.HOMESTEADFLAG.info?.notes}
          label="Homestead"
          variant="success"
        />
      )}
      {!!record.FARMSTEADFLAG && (
        <Chip
          className="ml-1 inline-flex first:ml-0"
          icon={GiFarmTractor}
          info={fields.FARMSTEADFLAG.info?.notes}
          label="Farmstead"
          variant="success"
        />
      )}
      {!!record.CLEANGREEN && (
        <Chip
          className="ml-1 inline-flex first:ml-0"
          icon={TbLeaf}
          info={fields.CLEANGREEN.info?.notes}
          label="Clean & Green"
          variant="success"
        />
      )}
      {!!record.ABATEMENTFLAG && (
        <Chip
          className="ml-1 inline-flex first:ml-0"
          icon={TbPigMoney}
          info={fields.ABATEMENTFLAG.info?.notes}
          label="Receives Abatement"
          variant="success"
        />
      )}
      {!record.HOMESTEADFLAG &&
        !record.FARMSTEADFLAG &&
        !record.CLEANGREEN &&
        !record.ABATEMENTFLAG && <Typography.Note>None</Typography.Note>}
    </div>
  );
}
