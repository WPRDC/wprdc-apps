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
        className={classNames(
          "ui-mx-1 ui-my-0.5 ui-inline ui-w-0 ui-border-black",
          {
            "ui-border-r": weight === "thin",
            "ui-border-r-2": weight === "thick",
            "ui-border-r-4": weight === "thicker",
          },
        )}
      />
    );
  }

  return (
    <hr
      className={classNames("ui-border-black", {
        "ui-border-t": weight === "thin",
        "ui-border-t-2": weight === "thick",
        "ui-border-t-4": weight === "thicker",
      })}
    />
  );
}
