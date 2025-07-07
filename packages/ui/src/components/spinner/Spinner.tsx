/**
 *
 * Spinner
 *
 * Indeterminate loading spinner
 *
 */

import ScaleLoader from "react-spinners/ScaleLoader";
import BarLoader from "react-spinners/BarLoader";
import type { SpinnerProps } from "./Spinner.types";

export function Spinner({
  size = "M",
  line,
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

  if (line) {
    return <BarLoader width="100%"></BarLoader>;
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
