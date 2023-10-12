/**
 *
 * Card
 *
 * Display related content together
 *
 **/
import * as React from "react";
import classNames from "classnames";
import { A } from "../a";
import type { CardProps } from "./Card.types.ts";

export function Card({
  href,
  title,
  subtitle,
  thumbnailSrc,
  thumbnailAltText,
  children,
}: CardProps): React.ReactElement {
  return (
    <li className="ui-flex ui-h-full ui-flex-col ui-rounded-t-md  ui-bg-background dark:ui-bg-backgroundDark">
      <A
        className={classNames(
          "ui ui-flex ui-h-full ui-flex-col ui-rounded-t-md ui-shadow-lg",
          "hover:ui-shadow-2xl active:ui-shadow dark:ui-border-textSecondaryDark",
        )}
        href={href}
        variant="unstyled"
      >
        <div className="ui-relative ui-z-0 ui-h-40 ui-rounded-t-md ui-border-2 ui-border-textSecondary dark:ui-border-textSecondaryDark">
          <div className="ui-absolute ui-bottom-0 ui-left-0 ui-px-3 ui-pb-1 ui-text-2xl ui-font-bold">
            <div className="ui-bg-background/40 ui-p-1 ui-font-mono ui-leading-none ui-backdrop-blur-sm dark:ui-bg-backgroundDark/40">
              {title}
            </div>
          </div>
          {thumbnailSrc ? (
            <img
              alt={thumbnailAltText ?? `${title} thumbnail`}
              className="ui-h-full ui-w-full ui-object-cover"
              src={thumbnailSrc}
            />
          ) : null}
        </div>
        <div className="ui-flex-grow  ui-border-2 ui-border-textSecondary ui-p-4 dark:ui-border-textSecondaryDark">
          {!!subtitle && (
            <div className="ui-mb-3 ui-font-medium ui-leading-none">
              {subtitle}
            </div>
          )}
          <div className="ui-text-sm">{children}</div>
        </div>
      </A>
    </li>
  );
}
