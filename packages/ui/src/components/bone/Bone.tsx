/**
 *
 * Bone
 *
 * Used to build skeletons.
 *
 **/
import * as React from "react";
import { twMerge } from "tailwind-merge";
import type { BoneProps } from "./Bone.types";

export function Bone({ className }: BoneProps): React.ReactElement {
  return (
    <div
      className={twMerge(
        "h-4 w-24 animate-pulse rounded-md bg-gray-500/40 text-2xl backdrop-blur-md",
        className,
      )}
    />
  );
}
