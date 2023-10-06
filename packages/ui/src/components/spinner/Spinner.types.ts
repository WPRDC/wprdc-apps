/**
 *
 * Spinner types
 *
 **/
import type { LoaderHeightWidthRadiusProps } from "react-spinners/helpers/props";
import type { SizeCategory } from "../../types";

export interface SpinnerProps extends LoaderHeightWidthRadiusProps {
  size?: SizeCategory;
}
