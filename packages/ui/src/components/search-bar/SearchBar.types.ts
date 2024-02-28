import type { SearchFieldProps } from "react-aria-components";

export interface SearchBarProps extends SearchFieldProps {
  label?: string;
  submitLabel?: string;
  searchURL: string;
}
