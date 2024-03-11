import type { ReactElement } from "react";
import React, { isValidElement } from "react";
import { twMerge } from "tailwind-merge";
import type { DatastoreRecord, Value } from "@wprdc/types";
import { Typography } from "../typography";
import { InfoTooltip } from "../tooltip";
import { formatValue } from "../../util";
import type { FieldValue, FieldValuesProps } from "./FieldValues.types";

export function FieldValues<T extends DatastoreRecord>({
  label,
  items,
  variant = "default",
  emptyMessage = "No results found",
  denseLabel = false,
  fields,
  record,
  colorBand = true,
  fullWidth = true,
}: FieldValuesProps<T>): React.ReactElement {
  const hasStrings = items.some((item) => typeof item === "string");

  // build objects from passed field names
  let fullItems: FieldValue[] = [];
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
    fullItems = items as FieldValue[];
  }
  const noValues = fullItems.every((item) => !item.value);

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

  if (variant === "dense")
    return (
      <>
        {!!label && <Typography.Label>{label}</Typography.Label>}
        {noValues ? (
          <Typography.Note className="text-sm">{emptyMessage}</Typography.Note>
        ) : (
          <table className={twMerge("table-fixed", fullWidth && "w-full")}>
            <tbody>
              {formattedItems.map(({ id, label: itemLabel, content, info }) => (
                <tr
                  className={twMerge(
                    "text-sm",
                    colorBand && "even:bg-stone-100",
                  )}
                  key={id}
                >
                  <th className="flex items-start pr-2 text-left align-top">
                    <div className="">{itemLabel}</div>
                    <div>{!!info && <InfoTooltip info={info} />}</div>
                  </th>
                  <td className="font-mono font-medium">{content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );

  // default variant
  return (
    <dl>
      {formattedItems.map(({ id, label: itemLabel, content, info }) => (
        <div
          className={twMerge(
            "pt-4 first-of-type:pt-0",
            denseLabel && "pt-1",
            colorBand && "even:bg-stone-100",
          )}
          key={id}
        >
          <dt>
            {denseLabel ? (
              <div className="text-sm font-bold">{itemLabel}</div>
            ) : (
              <Typography.Label>{itemLabel}</Typography.Label>
            )}
            <div>{!!info && <InfoTooltip info={info} />}</div>
          </dt>
          <dd className="font-mono text-sm">{content}</dd>
        </div>
      ))}
    </dl>
  );
}
