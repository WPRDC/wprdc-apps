import type {
  ComboBoxProps as RAComboBoxProps,
  ValidationResult,
} from "react-aria-components";

export interface ComboBoxProps<T extends object> extends Omit<
  RAComboBoxProps<T>,
  "children" | "className"
> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: React.ReactNode | ((item: T) => React.ReactNode);
  className?: string;
}
