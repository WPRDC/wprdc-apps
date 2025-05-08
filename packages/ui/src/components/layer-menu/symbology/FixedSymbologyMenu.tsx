"use client";

import { StyleValue } from "@wprdc/types";
import { FixedSymbologyMenuProps } from "../LayerMenu.types.ts";
import { Slider } from "react-aria-components";
import { ColorPicker } from "../../color-picker";

export function FixedSymbologyMenu<T extends StyleValue = StyleValue>({
  options,
  onChange,
}: FixedSymbologyMenuProps<T>) {
  const { value } = options;
  return (
    <div>
      {typeof value === "number" && (
        <Slider value={value} onChange={onChange as (value: number) => void} />
      )}

      {typeof value === "string" && (
        <ColorPicker
          value={value}
          onChange={(c) => (onChange as (value: string) => void)(c.toString())}
        />
      )}

      {/* Interactive*/}
      {typeof value === "object" && !Array.isArray(value) && (
        <div>{value.hovered}</div>
      )}
    </div>
  );
}
