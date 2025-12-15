import { ListOptions, SelectionMode } from "react-stately";
import { Key } from "react-stately";

export interface FilterListProps<
  T extends FilterListItem,
> extends ListOptions<T> {
  label?: string;
  selectionMode: SelectionMode;
  onChange?: (selection: Key[]) => void;
}

export interface FilterListItem {
  id: string | number;
  name: string;
}
