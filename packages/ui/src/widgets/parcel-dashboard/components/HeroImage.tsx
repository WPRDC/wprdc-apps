"use client";

import type { ImageProps } from "../../../components";
import { Image } from "../../../components";

export function HeroImage({ src }: Partial<ImageProps>): React.ReactElement {
  return (
    <Image
      alt="img"
      className="object-cover object-top"
      fill
      next
      src={src ?? ""}
    />
  );
}
