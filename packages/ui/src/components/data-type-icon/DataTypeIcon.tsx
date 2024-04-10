/**
 *
 * DataTypeIcon
 *
 * Data type icon
 *
 **/
import * as React from "react";
import {
  Tb123,
  TbAbc,
  TbCalendar,
  TbCalendarTime,
  TbClock,
  TbDecimal,
  TbMap,
  TbQuestionMark,
} from "react-icons/tb";
import { DataType } from "@wprdc/types";
import type { IconType } from "react-icons/lib/cjs/iconBase";
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
      return Tb123;
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
