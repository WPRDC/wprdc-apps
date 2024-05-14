import type { TextFieldProps as RATextFieldProps } from "react-aria-components";

export interface TextFieldProps extends RATextFieldProps {
  label: string;
  textarea?: boolean;
  inputClassName?: string;
  placeholder?: string;
  rows?: number;
}
