import type { FormattedValue, Formatter, Value } from "@wprdc/types";
import type { ReactNode } from "react";

export interface TableProps<T extends Value = Value> {
  label?: ReactNode;
  columns: string[];
  rows: string[];
  data: (T | FormattedValue<T> | undefined)[][];
  format?: Formatter<T>;
}
