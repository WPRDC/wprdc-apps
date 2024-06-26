import type { ReactElement, ReactNode } from "react";
import type { DatastoreRecord, FieldRecord, Value } from "@wprdc/types";

export interface FieldValue {
  id: number | string;
  label: ReactNode;
  value?: Value | ReactElement;
  format?: (value: Value) => ReactNode;
  info?: string;
}

export interface FieldValuesProps<T extends DatastoreRecord> {
  label?: string;
  items: (FieldValue | string)[];
  variant?: "dense" | "large" | "default";
  emptyMessage?: ReactNode;
  denseLabel?: boolean;
  fields?: FieldRecord<T>;
  record?: T;
  colorBand?: boolean;
  fullWidth?: boolean;
}
