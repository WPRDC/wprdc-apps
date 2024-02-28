/**
 *
 * Spinner types
 *
 **/
import type { LoaderHeightWidthRadiusProps } from "react-spinners/helpers/props";
import type { Size } from "@wprdc/types";

export interface SpinnerProps extends LoaderHeightWidthRadiusProps {
  size?: Size;
}
