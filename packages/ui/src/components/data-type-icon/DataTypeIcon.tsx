/**
 *
 * DataTypeIcon
 *
 * Data type icon
 *
 **/
import { DataType } from "@wprdc/types";
import type { IconType } from "react-icons";
import {
  TbAbc,
  TbCalendar,
  TbCalendarTime,
  TbClock,
  TbDecimal,
  TbMap,
  TbNumbers,
  TbQuestionMark,
} from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import type { DataTypeIconProps } from "./DataTypeIcon.types";

export function DataTypeIcon({
  dataType,
  className,
}: DataTypeIconProps): React.ReactElement {
  const Icon = getIcon(dataType);

  return <Icon className={twMerge("size-5", className)} />;
}

function getIcon(dataType: DataTypeIconProps["dataType"]): IconType {
  switch (dataType) {
    case DataType.Int:
      return TbNumbers;
    case DataType.Float:
      return TbDecimal;
    case DataType.Text:
      return TbAbc;
    case DataType.Date:
      return TbCalendar;
    case DataType.DateTime:
      return TbCalendarTime;
    case DataType.Time:
      return TbClock;
    case DataType.Geometry:
      return TbMap;
    default:
      return TbQuestionMark;
  }
}
