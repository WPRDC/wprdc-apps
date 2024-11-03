/**
 *
 * PopupImage types
 *
 **/
import { ImageProps } from "next/image";
import type * as React from "react";
import { ReactNode } from "react";

export interface PopupImageProps extends ImageProps {
  caption?: ReactNode;
}
