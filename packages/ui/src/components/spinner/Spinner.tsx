/**
 *
 * Spinner
 *
 * Indeterminate loading spinner
 *
 */

import ScaleLoader from "react-spinners/ScaleLoader";
import type { SpinnerProps } from "./Spinner.types";

export function Spinner({
  size = "M",
  ...props
}: SpinnerProps): React.ReactElement {
  let height = 35;
  let margin = 2;
  let radius = 2;
  let width = 2;
  switch (size) {
    case "S":
      height = 10;
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
      <div className="block dark:hidden">
        <ScaleLoader
          height={height}
          margin={margin}
          radius={radius}
          width={width}
          {...props}
        />
      </div>
      <div className="hidden dark:block">
        <ScaleLoader
          color="white"
          height={height}
          margin={margin}
          radius={radius}
          width={width}
          {...props}
        />
      </div>
    </>
  );
}
