"use client";
import { CategorySymbologyMenuProps } from "../LayerMenu.types.ts";
import { OptionallySimpleInteractive, StyleValue } from "@wprdc/types";
import { FixedSymbologyMenu } from "./FixedSymbologyMenu.tsx";

export function CategorySymbologyMenu<T extends StyleValue>({
  options,
  onChange,
}: CategorySymbologyMenuProps<T>) {
  const { value: values } = options;

  const handleChange =
    (category: string | number) => (value: OptionallySimpleInteractive<T>) => {
      onChange({
        ...values,
        [category]: value,
      });
    };

  return (
    <div>
      {Object.entries(values).map(([key, value]) => {
        return (
          <div key={key} className="flex gap-2">
            <div>{key}</div>

            <FixedSymbologyMenu<T>
              key={key}
              options={{
                mode: "fixed",
                value: value,
              }}
              onChange={handleChange(key)}
            />
          </div>
        );
      })}
    </div>
  );
}
