import type { AriaTextFieldOptions } from "react-aria";

export type TextFieldProps<T extends "input" | "textarea" = "input"> =
  AriaTextFieldOptions<T>;
