import { type Value } from "@wprdc/types";
import React, { type ReactElement, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { type IconType } from "react-icons/lib";
import { InfoTooltip } from "../components";

export type SingleValueVizVariant = "default" | "ratio" | "percent";

export interface SingleValueVizProps<T extends Value = Value> {
  /** Unique identifier */
  id: number | string;
  /** The value to display */
  value?: T;
  /** The value can also be passed as a child.  `value` will override */
  children?: T;
  /** Short label for the value being displayed */
  label: ReactNode;
  /** Function to render the value (e.g. i18n, color based on value) */
  format?: (value?: T) => ReactNode;
  /** Extra information that describes the value.  Used in tooltips. */
  info?: string;
  /** Style variant to use */
  variant?: SingleValueVizVariant;

  /** Icon to prepend to label */
  icon?: IconType;
  // Variant-specific props
  /**
   *
   * With `ratio` variant, will be displayed under `value`.
   * With `percent` variant, the denominator will be used to calculate the percent
   * */
  denominator?: number;

  className?: string;
}

export function SingleValueViz<T extends Value>({
  value,
  label,
  variant,
  info,
  icon: Icon,
  className,
  children,
  format = (v) => v,
}: SingleValueVizProps<T>): React.ReactElement {
  return (
    <div
      className={twMerge("rounded-sm border border-black bg-white", className)}
    >
      <div className="flex items-start bg-black px-2 text-white">
        <div className="flex items-center space-x-1 py-1.5">
          {!!Icon && <Icon />}
          <dt className="pr-1 font-mono text-sm font-bold uppercase leading-none">
            {label}
          </dt>
        </div>
        <div className="py-0.5 leading-none">
          {!!info && <InfoTooltip dark size="S" info={info} />}
        </div>
      </div>

      <div>
        <dd
          className={twMerge(
            "px-2 py-2 font-mono text-2xl font-bold leading-none",
          )}
        >
          {format(value ?? children)}
        </dd>
      </div>
    </div>
  );
}

export interface SingleValueVizCollectionProps<T extends Value = Value> {
  children?:
    | ReactElement<SingleValueVizProps<T>>
    | ReactElement<SingleValueVizProps<T>>[];
  className?: string;
  items?: SingleValueVizProps<T>[];
}

export function SingleValueVizCollection<T extends Value = Value>({
  children,
  className,
  items,
}: SingleValueVizCollectionProps<T>): React.ReactElement {
  return (
    <dl className={twMerge("", className)}>
      {children ??
        items?.map((item) => (
          <SingleValueViz
            key={item.id}
            {...item}
            className="mb-3.5 mr-3.5 inline-block"
          />
        ))}
    </dl>
  );
}
