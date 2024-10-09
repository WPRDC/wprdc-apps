/**
 *
 * RadioGroup types
 *
 **/
import type {
  RadioGroupProps as RARadioGroupProps,
  RadioProps as RARadioProps,
} from "react-aria-components";

export type RadioVariant = "default" | "chip";

export interface RadioProps extends RARadioProps {
  variant?: RadioVariant;
}

export type RadioGroupProps = RARadioGroupProps;
