import type { FormattedValue, Formatter, Value } from "@wprdc/types";
import type { ReactNode } from "react";

export interface TableProps {
  label?: ReactNode;
  columns?: string[];
  rows?: string[];
  data: (Value | FormattedValue | undefined)[][];
  format?: Formatter;
  totalCol?: boolean;
  totalRow?: boolean;

  rowLabel?: ReactNode;
}
