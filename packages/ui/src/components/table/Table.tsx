import type { FormattedValue, Formatter, Value } from "@wprdc/types";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import type { TableProps } from "./Table.types";
import { InfoTooltip } from "../tooltip";

export function Table<T extends Value = Value>({
  label,
  columns: _columns,
  rows,
  data,
  format,
  totalRow = false,
  totalCol = false,
  rowLabel: _rowLabel,
}: TableProps): null | React.ReactElement {
  const [rowLabel, rowLabelInfo] =
    typeof _rowLabel === "string"
      ? [_rowLabel, null]
      : [_rowLabel?.label, _rowLabel?.info];

  let columns: { label: string; info?: string }[] | undefined = _columns?.map((col) =>
    typeof col === "string" ? { label: col } : col,
  );

  return (
    <table className="w-full table-fixed border border-black font-mono text-sm">
      {!!label && <caption className="italic">{label}</caption>}

      {!!columns && (
        <thead>
          <tr className="bg-black">
            {rows ? (
              <th className="px-3 text-left text-white">
                {rowLabel}
                {!!rowLabelInfo && <InfoTooltip dark size="S" info={rowLabelInfo} />}
              </th>
            ) : null}

            {columns.map((col, c) => (
              <th
                className={twMerge(
                  "border-l border-white px-3",
                  totalCol && c === columns.length - 1
                    ? "border-l-2 text-primary"
                    : "text-white",
                )}
                key={col.label}
                scope="col"
              >
                {col.label}
                {!!col.info && <InfoTooltip dark size="S" info={col.info} />}
              </th>
            ))}
          </tr>
        </thead>
      )}


      <tbody>
        {data.map((row, i) => (
          <tr className="" key={`${i}`}>
            {!!rows && (
              <th
                className={twMerge(
                  "border-t border-white bg-black px-3 text-left",
                  totalRow && i === data.length - 1
                    ? "border-t-2 text-primary"
                    : "text-white",
                )}
                scope="row"
              >
                {rows[i]}
              </th>
            )}
            {data[i].map((cell, j) => (
              <Cell
                globalFormat={format}
                key={`${i}-${j}`}
                value={cell}
                inTotalRow={totalRow ? i === data.length - 1 : false}
                inTotalCol={totalCol ? j === data[i].length - 1 : false}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Cell({
  value,
  globalFormat,
  inTotalRow,
  inTotalCol,
}: {
  value: Value | FormattedValue | undefined;
  globalFormat?: Formatter;
  inTotalRow: boolean;
  inTotalCol: boolean;
}): React.ReactElement {
  let content: ReactNode;
  if (!value && value !== 0 && value !== false) {
    content = "N/A";
  } else if (typeof value === "object") {
    content = value.format(value.value);
  } else {
    content = globalFormat ? globalFormat(value) : value;
  }

  return (
    <td
      className={twMerge(
        "border border-black bg-white px-3 text-right font-mono",
        inTotalCol || inTotalRow ? "bg-wprdc-50 font-bold" : "",
        inTotalCol && "border-l-2",
        inTotalRow && "border-t-2",
      )}
    >
      {content}
    </td>
  );
}
