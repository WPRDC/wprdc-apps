/**
 *
 * ListBox
 *
 * Display options to be selected.
 *
 **/
"use client";

import * as React from "react";
import { ListBox as RAListBox } from "react-aria-components";
import type { ListBoxProps } from "./ListBox.types";

export function ListBox<T extends object>(
  props: ListBoxProps<T>,
): React.ReactElement {
  return <RAListBox {...props} />;
}
