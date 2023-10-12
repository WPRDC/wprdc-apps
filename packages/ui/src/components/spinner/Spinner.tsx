/**
 *
 * Spinner
 *
 * Indeterminate loading spinner
 *
 */
import * as React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import type { SpinnerProps } from "./Spinner.types.ts";

export function Spinner({ size = "M" }: SpinnerProps): React.ReactElement {
  let height = 35;
  let margin = 2;
  let radius = 2;
  let width = 2;
  switch (size) {
    case "S":
      height = 24;
      break;
    case "L":
      height = 48;
      margin = 4;
      radius = 4;
      width = 4;
      break;
    case "M":
    default:
  }
  return (
    <>
      <div className="ui-block dark:ui-hidden">
        <ScaleLoader
          height={height}
          margin={margin}
          radius={radius}
          width={width}
        />
      </div>
      <div className="ui-hidden dark:ui-block">
        <ScaleLoader
          color="white"
          height={height}
          margin={margin}
          radius={radius}
          width={width}
        />
      </div>
    </>
  );
}
