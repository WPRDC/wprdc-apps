/**
 *
 * Spinner types
 *
 **/
import type { Size } from "@wprdc/types";
import type {
  LoaderHeightWidthProps,
  LoaderHeightWidthRadiusProps,
} from "react-spinners/helpers/props";

export interface SpinnerProps extends LoaderHeightWidthRadiusProps {
  size?: Size;
}

export interface LoaderProps extends LoaderHeightWidthProps {
  size?: Size;
}
