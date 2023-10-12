/**
 *
 * RadioGroup
 *
 * A group of radio buttons
 *
 */
import * as React from "react";
import { useRadioGroupState } from "react-stately";
import { useRadio, useRadioGroup } from "react-aria";
import type {
  RadioGroupProps,
  RadioGroupState,
  RadioProps,
} from "./RadioGroup.types.ts";

const RadioContext = React.createContext<RadioGroupState>(
  {} as RadioGroupState,
);

export function RadioGroup(props: RadioGroupProps): React.ReactElement {
  const { children, label } = props;
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);

  return (
    <div {...radioGroupProps}>
      <span
        {...labelProps}
        className="ui-block ui-cursor-default ui-text-left ui-font-mono ui-text-xs ui-font-semibold ui-uppercase ui-text-gray-500"
      >
        {label}
      </span>
      <RadioContext.Provider value={state}>
        <div className="ui-pl-2">{children}</div>
      </RadioContext.Provider>
    </div>
  );
}

export function Radio(props: RadioProps): React.ReactElement {
  const { children } = props;
  const state = React.useContext<RadioGroupState>(RadioContext);
  const ref = React.useRef<HTMLInputElement>(null);
  const { inputProps } = useRadio(props, state, ref);

  return (
    <label className="ui-cursor-pointer" style={{ display: "block" }}>
      <input
        {...inputProps}
        className="ui-mr-1 ui-cursor-pointer ui-border ui-border-transparent ui-outline-none focus:ui-border-focused-400 focus:ui-ring focus:ui-ring-focused-400"
        ref={ref}
      />
      {children}
    </label>
  );
}
