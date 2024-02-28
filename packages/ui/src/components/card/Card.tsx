/**
 *
 * Card
 *
 * Display related content together
 *
 **/

import classNames from "classnames";
import { A } from "../a";
import type { CardProps } from "./Card.types";

export function Card({
  href,
  title,
  subtitle,
  thumbnailSrc,
  thumbnailAltText,
  children,
}: CardProps): React.ReactElement {
  return (
    <li className="flex h-full flex-col rounded-t-md  bg-background dark:bg-backgroundDark">
      <A
        className={classNames(
          "ui flex h-full flex-col rounded-t-md shadow-lg",
          "hover:shadow-2xl active:shadow dark:border-textSecondaryDark",
        )}
        href={href}
      >
        <div className="relative z-0 h-40 rounded-t-md border-2 border-textSecondary dark:border-textSecondaryDark">
          <div className="absolute bottom-0 left-0 px-3 pb-1 text-2xl font-bold">
            <div className="bg-background/40 p-1 font-mono leading-none backdrop-blur-sm dark:bg-backgroundDark/40">
              {title}
            </div>
          </div>
          {thumbnailSrc ? (
            <img
              alt={thumbnailAltText ?? `${title} thumbnail`}
              className="h-full w-full object-cover"
              src={thumbnailSrc}
            />
          ) : null}
        </div>
        <div className="flex-grow  border-2 border-textSecondary p-4 dark:border-textSecondaryDark">
          {!!subtitle && (
            <div className="mb-3 font-medium leading-none">{subtitle}</div>
          )}
          <div className="text-sm">{children}</div>
        </div>
      </A>
    </li>
  );
}
