import { ReactElement, ReactNode } from "react";
import { Extent, GeoType, Publisher } from "@/types/shared";
import { Value } from "./shared";

export type Size = "S" | "M" | "L" | "XL";

export interface LayerMenuItemOptions {
  name: string;
  geoType: GeoType;
  extent: string;
  publisher: Publisher;
}

export interface FieldValue {
  id: number | string;
  label: ReactNode;
  value?: Value | ReactElement;
  format?: (value: Value) => ReactNode;
  info?: string;
}

export enum DatastoreTable {
  Assessment = "property_assessments",
  PropertySaleTransactions = "property_sale_transactions",
  AssessmentAppeals = "8e92a566-b52b-4d10-9fb5-c18b883cd926",
  FiledAssessmentAppeals = "12e00874-bdca-46c2-89ab-bd0e9272b3cb",
  PLIPermit = "pli_permits",
  CityViolations = "city_violations",
  ForeclosureFilings = "foreclosure_filings",
  TaxLiensWithCurrentStatus = "tax_liens_with_current_status",
  ConservatorshipRecord = "conservatorship_record",
  ParcelBoundaries = "parcel_boundaries",
}

export const parcelIDFields: Record<DatastoreTable, string> = {
  [DatastoreTable.Assessment]: "PARID",
  [DatastoreTable.PropertySaleTransactions]: "PARID",
  [DatastoreTable.AssessmentAppeals]: "PARCEL ID",
  [DatastoreTable.FiledAssessmentAppeals]: "parcel_id",
  [DatastoreTable.PLIPermit]: "parcel_num",
  [DatastoreTable.CityViolations]: "parcel_id",
  [DatastoreTable.ForeclosureFilings]: "pin",
  [DatastoreTable.TaxLiensWithCurrentStatus]: "pin",
  [DatastoreTable.ConservatorshipRecord]: "pin",
  [DatastoreTable.ParcelBoundaries]: "PIN",
};

export interface FieldDef<R extends object> {
  id: keyof R;
  type: string;
  info?: {
    label?: string;
    notes?: string;
    type_override?: string;
  };
}

export interface QueryResult<T extends object> {
  fields: FieldDef<T>[];
  records: T[];
}

export type FieldRecord<T extends object> = Record<keyof T, FieldDef<T>>;

export interface APISingleResult<T extends object> {
  fields: FieldRecord<T>;
  record: T;
}

export interface APIMultiResult<T extends object> {
  fields: FieldRecord<T>;
  records: T[];
}

export * from "./shared";
export * from "./mapping";
export * from "./templates";
export * from "./model";
