/**
 *
 * Tag types
 *
 **/
import type { SizeCategory } from "../../types";

export interface TagProps {
  label: string;
  size?: SizeCategory;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export interface TagsProps {
  children?: React.ReactNode;
  tags?: (Omit<TagProps, "size"> & { id: string | number })[];
  size?: SizeCategory;
}
