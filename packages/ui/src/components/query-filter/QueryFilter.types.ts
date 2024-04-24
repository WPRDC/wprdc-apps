/**
 *
 * QueryFilter types
 *
 **/
import type { DatastoreField, DatastoreRecord } from "@wprdc/types";
import type { RuleGroupType } from "react-querybuilder";

export interface QueryFilterProps {
  /** Set of fields that be used in the filter */
  fields: DatastoreField[];

  /** Default state for uncontrolled instances */
  defaultQuery?: RuleGroupType;

  // To use as a controlled component
  /** State of the query for controlled instances */
  query?: RuleGroupType;
  /** Callback to update controlled state */
  onChange?: (query?: RuleGroupType) => void;
}
