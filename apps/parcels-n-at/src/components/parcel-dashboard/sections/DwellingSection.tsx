import type { PropertyAssessment } from "@wprdc/types";
import { FieldValues } from "../../../components";
import type { SectionProps } from "../types";

export function DwellingSection({
  fields,
  records,
}: SectionProps<PropertyAssessment>): React.ReactElement {
  const record = records[0];

  return (
    <FieldValues
      emptyMessage="Not available for this parcel"
      items={[
        {
          id: "style",
          label: "Style",
          info: fields.STYLE.info?.notes,
          value: record.STYLEDESC,
        },
        {
          id: "yearblt",
          label: "Year Built",
          info: fields.YEARBLT.info?.notes,
          value: record.YEARBLT
            ? `${record.YEARBLT} (~${
                new Date().getFullYear() - record.YEARBLT
              } years)`
            : undefined,
        },
        {
          id: "stories",
          label: "Stories",
          info: fields.STORIES.info?.notes,
          value: record.STORIES,
        },
        {
          id: "roof",
          label: "Roof",
          info: fields.ROOF.info?.notes,
          value: record.ROOFDESC,
        },
        {
          id: "basement",
          label: "Basement",
          info: fields.BASEMENT.info?.notes,
          value: record.BASEMENTDESC,
        },
        {
          id: "heating-cooling",
          label: "Heating and Cooling",
          info: fields.HEATINGCOOLING.info?.label,
          value: record.HEATINGCOOLINGDESC,
        },
        {
          id: "extfinish",
          label: "Exterior Finish",
          info: fields.EXTFINISH_DESC.info?.notes,
          value: record.EXTFINISH_DESC,
        },

        {
          id: "finished-living-area",
          label: "Finish Living Area",
          info: fields.FINISHEDLIVINGAREA.info?.notes,
          value: record.FINISHEDLIVINGAREA,
        },

        {
          id: "total-rooms",
          label: "Rooms",
          info: fields.TOTALROOMS.info?.notes,
          value: record.TOTALROOMS,
        },
        {
          id: "bedrooms",
          label: "Bedrooms",
          info: fields.BEDROOMS.info?.notes,
          value: record.BEDROOMS,
        },
        {
          id: "full-baths",
          label: "Full Baths",
          info: fields.FULLBATHS.info?.notes,
          value: record.FULLBATHS,
        },
        {
          id: "half-baths",
          label: "Half Baths",
          info: fields.HALFBATHS.info?.notes,
          value: record.HALFBATHS,
        },
        {
          id: "fireplaces",
          label: "Fireplaces",
          info: fields.FIREPLACES.info?.notes,
          value: record.FIREPLACES,
        },
        {
          id: "basement-garage",
          label: "Integral Basement Garage",
          info: fields.BSMTGARAGE.info?.notes,
          value: record.BSMTGARAGE,
        },
      ]}
      variant="dense"
    />
  );
}
