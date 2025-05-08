import { ZoomMenuItemProps } from "../LayerMenu.types.ts";
import { NumberField } from "../../number-field";
import { InteractiveExpression } from "@wprdc/types";
import { ReactElement } from "react";

export function ZoomMenuItem<T extends number | InteractiveExpression<number>>({
  zoom,
  field,
  value,
  onChange,
}: ZoomMenuItemProps<T>): ReactElement {
  // todo: handle
  const handleChange =
    (state: keyof InteractiveExpression<number> | "fixed") => (v: number) => {
      if (!onChange) return;

      if (state === "fixed") {
        onChange(v as T);
      } else if (typeof value === "object") {
        // @ts-ignore
        onChange({ ...(value as InteractiveExpression<number>), [state]: v });
      }
    };

  return (
    <div>
      <NumberField aria-label="zoom level" value={zoom} />
      {typeof value === "object" ? (
        <div>
          <NumberField aria-label={`${field} value`} value={value.default} />
          <NumberField aria-label={`${field} value`} value={value.hovered} />
          <NumberField aria-label={`${field} value`} value={value.selected} />
        </div>
      ) : (
        <NumberField aria-label={`${field} value`} value={value} />
      )}
    </div>
  );
}
