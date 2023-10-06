/**
 *
 * Title types
 *
 **/
import type { HTMLProps } from "react";
import type { HeadingTag } from "../../types";

export interface TitleProps extends HTMLProps<HTMLHeadingElement> {
  headingTag?: HeadingTag;
}
