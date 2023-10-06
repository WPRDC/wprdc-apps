/**
 *
 * Divider
 *
 * One section, divisible....
 *
 */
import * as React from "react";
import classNames from "classnames";
import type { DividerProps } from "./Divider.types.ts";

export function Diver({
  vertical,
  weight = "thin",
}: DividerProps): React.ReactElement {
  if (vertical) {
    return (
      <div
        className={classNames("mx-1 my-0.5 inline w-0 border-black", {
          "border-r": weight === "thin",
          "border-r-2": weight === "thick",
          "border-r-4": weight === "thicker",
        })}
      />
    );
  }

  return (
    <hr
      className={classNames("border-black", {
        "border-t": weight === "thin",
        "border-t-2": weight === "thick",
        "border-t-4": weight === "thicker",
      })}
    />
  );
}
