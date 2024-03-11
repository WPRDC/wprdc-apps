/**
 *
 * RadioGroup
 *
 * A group of radio buttons
 *
 */
"use client";

import { RadioGroup as RARadioGroup } from "react-aria-components";
import type { RadioGroupProps } from "./RadioGroup.types";

export function RadioGroup({
  children,
  ...props
}: RadioGroupProps): React.ReactElement {
  return <RARadioGroup {...props}>{children}</RARadioGroup>;
}
