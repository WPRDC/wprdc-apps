import type { DatastoreRecord, FieldRecord, Value } from "@wprdc/types";
import React, {
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import { type IconType } from "react-icons/lib";
import { formatValue } from "../util";
import { Typography } from "../components/typography";
import { InfoTooltip } from "../components";
import { Formatter } from "@wprdc/types";

export interface DataListVizItem {
  id: number | string;
  label: ReactNode;
  value?: Value | ReactElement;
  format?: Formatter;
  info?: string;
}

export interface DataListVizProps<T extends DatastoreRecord> {
  label?: string;
  items: (DataListVizItem | string)[];
  variant?: "dense" | "large" | "default";
  fields?: FieldRecord<T>;
  record?: T;
  colorBand?: boolean;
  className?: string;
  icon?: IconType;
}

export function DataListViz<T extends DatastoreRecord>({
  items,
  fields,
  record,
  icon: Icon,
}: DataListVizProps<T>): React.ReactElement {
  const hasStrings = items.some((item) => typeof item === "string");

  // build objects from passed field names
  let fullItems: DataListVizItem[] = [];
  if (hasStrings && !!fields && !!record) {
    fullItems = items.map((item) =>
      typeof item === "string"
        ? {
            id: item,
            label: fields[item].info?.label,
            value: record[item],
            info: fields[item].info?.notes,
          }
        : item,
    );
  } else if (!hasStrings) {
    fullItems = items as DataListVizItem[];
  }
  const formattedItems = fullItems.map((item) => ({
    id: item.id,
    label: item.label,
    info: item.info,
    content: isValidElement<ReactElement>(item.value)
      ? item.value
      : formatValue(
          item.value as Value,
          item.format,
          <Typography.Note>not recorded</Typography.Note>,
        ),
  }));

  return (
    <dl className="rounded-xs border border-black">
      {formattedItems.map((item) => (
        <div className={twMerge("first-of-type:pt-0")} key={item.id}>
          <div className="flex items-start bg-black px-2 text-white">
            <div className="flex items-center space-x-1 py-1.5">
              {!!Icon && <Icon />}
              <dt className="pr-1 font-mono text-sm font-bold uppercase leading-none">
                {item.label}
              </dt>
            </div>

            <div className="py-0.5 leading-none text-xs">
              {!!item.info && <InfoTooltip dark size="S" info={item.info} />}
            </div>
          </div>
          <dd className="bg-white px-2 pt-1 pb-1.5 font-mono text-sm font-medium">
            {item.content}
          </dd>
        </div>
      ))}
    </dl>
  );
}
