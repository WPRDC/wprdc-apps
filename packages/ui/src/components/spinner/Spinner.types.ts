/**
 *
 * Spinner types
 *
 **/
import type {
  LoaderHeightWidthProps,
  LoaderHeightWidthRadiusProps,
} from "react-spinners/helpers/props";
import type { Size } from "@wprdc/types";

export interface SpinnerProps extends LoaderHeightWidthRadiusProps {
  size?: Size;
}

export interface LoaderProps extends LoaderHeightWidthProps {
  size?: Size;
}
