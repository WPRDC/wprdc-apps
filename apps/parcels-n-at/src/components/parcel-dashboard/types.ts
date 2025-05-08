import type { APIResult } from "@wprdc/api";
import type { DatastoreRecord, FieldRecord, ParcelIndex } from "@wprdc/types";
import { ReactNode } from "react";

export type SectionProps<
  T extends DatastoreRecord,
  P extends object = object,
> = {
  fields: FieldRecord<T>;
  records: T[];
  className?: string;
} & P;

export type MultiSourceSectionProps<
  T extends Record<string, DatastoreRecord>,
  P extends object = object,
> = {
  [K in keyof T]: SectionProps<T[K]>;
} & P;

export type DatastoreRecordSet = Record<string, DatastoreRecord>;

export type GetterSet<T extends DatastoreRecordSet> = {
  [K in keyof T]: (parcelID: string) => Promise<APIResult<T[K]>>;
};

export type ResponseSet<T extends DatastoreRecordSet> = {
  [K in keyof T]: APIResult<T[K]>;
};

export interface CommonSectionProps<T extends object> {
  parcelID: string;
  label: string;
  description?: ReactNode;
  datasetLinks?: string[];
  defaultOpen?: boolean;
  className?: string;
  sectionProps?: T;
  id?: string;
}

export interface ConnectedSectionProps<
  T extends DatastoreRecord,
  P extends object = object,
> extends CommonSectionProps<P> {
  section: (props: SectionProps<T> & P) => React.ReactElement;
  getter: (parcelID: string) => Promise<APIResult<T>>;
}

export interface MultiConnectedSectionProps<
  T extends DatastoreRecordSet,
  P extends object = object,
> extends CommonSectionProps<P> {
  section: (props: MultiSourceSectionProps<T> & P) => React.ReactElement;
  getters: GetterSet<T>;
}

export interface ParcelSearchItemProps {
  item: ParcelIndex;
}
