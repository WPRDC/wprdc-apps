/**
 *
 * Divider
 *
 * One section, divisible....
 *
 */

import { twMerge } from "tailwind-merge";
import type { DividerProps } from "./Divider.types";

export function Divider({
  vertical,
  weight = "thin",
  className,
}: DividerProps): React.ReactElement {
  if (vertical) {
    return (
      <div
        className={twMerge(
          "mx-1 my-0.5 inline w-0 border-black",
          weight === "thin" && "border-r",
          weight === "thick" && "border-r-2",
          weight === "thicker" && "border-r-4",
          className,
        )}
      />
    );
  }

  return (
    <hr
      className={twMerge(
        "border-black",
        weight === "thin" && "border-t",
        weight === "thick" && "border-t-2",
        weight === "thicker" && "border-t-4",
        className,
      )}
    />
  );
}
