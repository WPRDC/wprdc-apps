/**
 *
 * RadioGroup types
 *
 **/
import type {
  RadioGroupProps as RSRadioGroupProps,
  RadioProps as RSRadioProps,
} from "@react-types/radio";
import type { ReactElement } from "react";

export type { RadioGroupState } from "react-stately";

export interface RadioGroupProps extends RSRadioGroupProps {
  children: ReactElement<RadioProps> | ReactElement<RadioProps>[];
}

export type RadioProps = RSRadioProps;
