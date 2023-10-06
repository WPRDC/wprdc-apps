/**
 *
 * SearchBar types
 *
 **/
import type { AriaSearchFieldProps } from "react-aria";

export interface SearchBarProps extends AriaSearchFieldProps {
  searchURL: string;
}
