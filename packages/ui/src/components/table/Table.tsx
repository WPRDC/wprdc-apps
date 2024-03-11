import type { FormattedValue, Formatter, Value } from "@wprdc/types";
import type { ReactNode } from "react";
import { Typography } from "../typography";
import type { TableProps } from "./Table.types";

export function Table<T extends Value = Value>({
  label,
  columns,
  rows,
  data,
  format,
}: TableProps<T>): null | React.ReactElement {
  // ensure correct dimensions
  if (rows.length !== data.length) return null;
  data.forEach((item) => {
    if (item.length !== columns.length) return null;
  });

  return (
    <div>
      {!!label && <Typography.Label>{label}</Typography.Label>}
      <table className="w-full table-fixed font-mono text-sm">
        <thead>
          <tr>
            <td />
            {columns.map((col) => (
              <th
                className="border-b-2 border-black font-sans"
                key={col}
                scope="col"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr className="even:bg-stone-100" key={row}>
              <th className="truncate text-right font-sans" scope="row">
                {row}
              </th>
              {data[i].map((cell, j) => (
                <Cell<T>
                  globalFormat={format}
                  key={`${row}-${columns[j]}`}
                  value={cell}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Cell<T extends Value>({
  value,
  globalFormat,
}: {
  value: T | FormattedValue<T> | undefined;
  globalFormat?: Formatter<T>;
}): React.ReactElement {
  let content: ReactNode;
  if (!value && value !== 0 && value !== false) {
    content = "N/A";
  } else if (typeof value === "object") {
    content = value.format(value.value);
  } else {
    content = globalFormat ? globalFormat(value) : value;
  }

  return <td className=" min-w-[64px] px-3 text-right">{content}</td>;
}
