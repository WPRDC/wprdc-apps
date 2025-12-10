import type { PropertyAssessment, Value } from "@wprdc/types";
import type { SectionProps } from "../types";
import { ClassChip } from "@/components/parcel-dashboard/components/class-chip";
import {
  SingleValueVizCollection,
  SingleValueVizProps,
  TreeViz,
  TreeVizItemProps,
} from "@wprdc/ui";
import {
  TbCarGarage,
  TbFlame,
  TbRuler,
  TbStairsDown,
  TbStairsUp,
  TbTemperatureSnow,
  TbTemperatureSun,
  TbWall,
} from "react-icons/tb";
import { PiDoorBold, PiHammerBold, PiSolarRoof } from "react-icons/pi";
import { MdOutlineDesignServices } from "react-icons/md";

export function DwellingSection({
  fields,
  records,
}: SectionProps<PropertyAssessment>): React.ReactElement {
  const record = records[0];

  const empty = !record["EXTERIORFINISH"];

  const basic: SingleValueVizProps<Value>[] = [
    {
      id: "yearblt",
      label: "Year Built",
      info: fields.YEARBLT.info?.notes,
      value: record.YEARBLT,
      icon: PiHammerBold,
    },
    {
      id: "finished-living-area",
      label: "Finish Living Area",
      info: fields.FINISHEDLIVINGAREA.info?.notes,
      value: record.FINISHEDLIVINGAREA,
      format: (v) => (
        <span>
          {Number(v ?? 0).toLocaleString()} ft<sup>2</sup>
        </span>
      ),

      icon: TbRuler,
    },
  ];

  const items: SingleValueVizProps<Value>[] = [
    {
      id: "style",
      label: "Style",
      info: fields.STYLE.info?.notes,
      value: record.STYLEDESC,
      icon: MdOutlineDesignServices,
    },
    {
      id: "extfinish",
      label: "Exterior",
      info: fields.EXTFINISH_DESC.info?.notes,
      value: record.EXTFINISH_DESC,
      icon: TbWall,
    },
    {
      id: "roof",
      label: "Roof",
      info: fields.ROOF.info?.notes,
      value: record.ROOFDESC,
      icon: PiSolarRoof,
    },
  ];

  const floors: SingleValueVizProps<Value>[] = [
    {
      id: "stories",
      label: "Stories",
      info: fields.STORIES.info?.notes,
      value: record.STORIES,
      icon: TbStairsUp,
      format: (v) => `${v} stor${v == 1 ? "y" : "ies"}`,
    },
    {
      id: "basement",
      label: "Basement",
      info: fields.BASEMENT.info?.notes,
      value: record.BASEMENTDESC,
      icon: TbStairsDown,
    },
  ];

  const hvac: SingleValueVizProps<Value>[] = [
    {
      id: "heating",
      label: "Heating",
      info: fields.HEATINGCOOLING.info?.label,
      value: record.HEATINGCOOLINGDESC,
      format: (v) => String(v).replace(" with AC", "").replace(" but", ""),
      icon: TbTemperatureSun,
    },
    {
      id: "cooling",
      label: "Cooling",
      info: fields.HEATINGCOOLING.info?.label,
      value: record.HEATINGCOOLINGDESC,
      format: (v) => (String(v).includes("with AC") ? "AC" : "None"),
      icon: TbTemperatureSnow,
    },
    {
      id: "fireplaces",
      label: "Fireplaces",
      info: fields.FIREPLACES.info?.notes,
      value: record.FIREPLACES,
      icon: TbFlame,
      format: (v) => (v ? v : "None"),
    },
    {
      id: "basement-garage",
      label: "Bsmt. Garage",
      info: fields.BSMTGARAGE.info?.notes,
      value: record.BSMTGARAGE,
      icon: TbCarGarage,
      format: (v) => (isNaN(Number(v)) || !Number(v) ? "None" : `${v}-car`),
    },
  ];

  const rooms: TreeVizItemProps<Value>[] = [
    {
      id: "total-rooms",
      label: "Total",
      info: fields.TOTALROOMS.info?.notes,
      value: record.TOTALROOMS,
      items: [
        {
          id: "bedrooms",
          label: "Bedrooms",
          info: fields.BEDROOMS.info?.notes,
          value: record.BEDROOMS,
        },
        {
          id: "baths",
          label: "Baths",
          value: Number(record.FULLBATHS) + Number(record.HALFBATHS),
          items: [
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
          ],
        },
        {
          id: "other-rooms",
          label: "Other",
          value:
            Number(record.TOTALROOMS) -
            Number(record.BEDROOMS) -
            Number(record.HALFBATHS) -
            Number(record.FULLBATHS),
        },
      ],
    },
  ];

  const allItems = [...basic, ...items, ...floors, ...hvac];

  return (
    <div className="w-full">
      {empty && (
        <div className="text-sm italic">
          <p>Dwelling characteristics aren&apos;t available for this parcel.</p>
          <p>
            Currently, they are only available for{" "}
            <ClassChip inline parcelClass="RESIDENTIAL" size="S" /> properties.
          </p>
        </div>
      )}
      {!empty && <SingleValueVizCollection items={allItems} />}

      {!empty && (
        <TreeViz id="rooms" items={rooms} label="Rooms" icon={PiDoorBold} />
      )}
    </div>
  );
}
