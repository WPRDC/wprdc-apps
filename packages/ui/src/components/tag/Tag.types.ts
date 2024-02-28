/**
 *
 * Tag types
 *
 **/
import type { Size } from "@wprdc/types";

export interface TagProps {
  children?: string;
  size?: Size;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export interface TagsProps {
  children?: React.ReactNode;
  tags?: (Omit<TagProps, "size" | "children"> & {
    id: string | number;
    label: string;
  })[];
  size?: Size;
  className?: string;
  tagClassName?: string;
}
