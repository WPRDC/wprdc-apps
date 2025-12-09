import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface CardProps {
  href: string;
  title: string;
  subtitle?: string | null;
  thumbnailURL?: string | null;
  thumbnailAltText?: string | null;
}

export function Card({
  href,
  title,
  subtitle,
  thumbnailURL,
  thumbnailAltText,
}: CardProps) {
  return (
    <li className="flex h-full flex-col">
      <Link
        href={href}
        className="border-text-secondary dark:border-text-secondary-dark hover:border-primary flex h-full flex-col-reverse border-2 shadow-lg hover:shadow-2xl active:shadow"
      >
        <div className=" flex-grow p-4">
          <div className="mb-3 text-2xl font-bold">{title}</div>
          {!!subtitle && <div>{subtitle}</div>}
        </div>

        {thumbnailURL && (
          <div className="relative z-0 h-40 border-2">
            <Image
              src={thumbnailURL}
              alt={thumbnailAltText ?? `${title} thumbnail`}
              fill
              className="object-cover"
            />
          </div>
        )}
      </Link>
    </li>
  );
}
