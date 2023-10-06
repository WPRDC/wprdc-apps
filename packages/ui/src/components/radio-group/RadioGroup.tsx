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
        className="block cursor-default text-left font-mono text-xs font-semibold uppercase text-gray-500"
      >
        {label}
      </span>
      <RadioContext.Provider value={state}>
        <div className="pl-2">{children}</div>
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
        className="focus:border-focused-400 focus:ring-focused-400 mr-1 cursor-pointer border border-transparent outline-none focus:ring"
        ref={ref}
      />
      {children}
    </label>
  );
}
