/**
 *
 * Loader
 *
 * Indeterminate loading bar
 *
 */

import BarLoader from "react-spinners/BarLoader";
import type { LoaderProps } from "./Spinner.types";

export function Loader({
  size = "M",
  ...props
}: LoaderProps): React.ReactElement {
  let height = 3;
  switch (size) {
    case "S":
      height = 5;
      break;
    case "L":
      height = 8;
      break;
    case "M":
    default:
  }
  return (
    <>
      <div className="block dark:hidden">
        <BarLoader height={height} width="100%" {...props} />
      </div>
      <div className="hidden dark:block">
        <BarLoader color="white" height={height} width="100%" {...props} />
      </div>
    </>
  );
}
