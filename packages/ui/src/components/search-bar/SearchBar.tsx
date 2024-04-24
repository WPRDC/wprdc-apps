/**
 *
 * SearchBar
 *
 * Search input with controls and label
 *
 **/
"use client";

import {
  Button as RAButton,
  FieldError,
  Form,
  Input,
  Label,
  SearchField,
} from "react-aria-components";
import { Button } from "../button";
import type { SearchBarProps } from "./SearchBar.types";

export function SearchBar({
  label,
  submitLabel,
  searchURL,
  ...props
}: SearchBarProps): React.ReactElement {
  return (
    <div>
      <Form
        action={searchURL}
        className="space-x-0 space-y-4 md:flex md:items-stretch md:space-x-2 md:space-y-0"
      >
        <SearchField {...props}>
          <Label>{label}</Label>
          <Input />
          <RAButton>✕</RAButton>
          <FieldError />
        </SearchField>
      </Form>
      <Button type="submit">{submitLabel ?? "Search"}</Button>
    </div>
  );
}
