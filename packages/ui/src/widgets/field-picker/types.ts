import type { DatastoreField, DatastoreRecord } from "@wprdc/types";
import type {
  ListBoxItemProps,
  ListBoxProps,
  Selection,
} from "react-aria-components";

export interface FieldPickerProps<T extends DatastoreRecord>
  extends ListBoxProps<T> {
  /** Set of fields to pick from */
  fields: DatastoreField<T>[];

  /** Controlled selection state */
  selection?: Selection;
  /** Call back for use as a controlled component */
  onSelectionChange?: (selection: Selection) => void;
}

export interface FieldPickerItemProps<T extends DatastoreRecord>
  extends Omit<ListBoxItemProps, "children" | "textValue"> {
  field: DatastoreField<T>;
}
