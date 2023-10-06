/**
 *
 * Card
 *
 * Display related content together
 *
 **/
import * as React from "react";
import Image from "next/image";
import { A } from "../a";
import type { CardProps } from "./Card.types.ts";

export function Card({
  href,
  title,
  subtitle,
  thumbnailURL,
  thumbnailAltText,
}: CardProps): React.ReactElement {
  return (
    <li className="flex h-full flex-col">
      <A
        className="border-textSecondary dark:border-textSecondaryDark hover:border-primary flex h-full flex-col-reverse border-2 shadow-lg hover:shadow-2xl active:shadow"
        href={href}
      >
        <div className=" flex-grow p-4">
          <div className="mb-3 text-2xl font-bold">{title}</div>
          {!!subtitle && <div>{subtitle}</div>}
        </div>
        {thumbnailURL ? (
          <div className="relative z-0 h-40 border-2">
            <Image
              alt={thumbnailAltText ?? `${title} thumbnail`}
              className="object-cover"
              fill
              src={thumbnailURL}
            />
          </div>
        ) : null}
      </A>
    </li>
  );
}
