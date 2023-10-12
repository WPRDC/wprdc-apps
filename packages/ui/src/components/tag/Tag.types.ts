/**
 *
 * Tag types
 *
 **/
import type { SizeCategory } from "../../types";

export interface TagProps {
  children?: string;
  size?: SizeCategory;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export interface TagsProps {
  children?: React.ReactNode;
  tags?: (Omit<TagProps, "size" | "children"> & {
    id: string | number;
    label: string;
  })[];
  size?: SizeCategory;
}
