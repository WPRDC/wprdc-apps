import React, { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import type { IconType } from "react-icons";
import { TbCircleFilled, TbSquareRotatedFilled, } from "react-icons/tb";
import { InfoTooltip } from "../components";

interface Option {
  label: string;
  halfStep?: boolean;
}

export interface PositionVizProps {
  /** Unique identifier */
  id: number | string;

  /** The value to display */
  value?: string;

  /** Possible options the value could take in order */
  options: (string | Option)[];

  /** Short label for the value being displayed */
  label: ReactNode;
  /** Function to render the value (e.g. i18n, color based on value) */
  format?: (value?: string, halfStep?: boolean) => ReactNode;
  /** Extra information that describes the value.  Used in tooltips. */
  info?: string;

  /** Icon to prepend to label */
  icon?: IconType;

  match?: (option: string, value?: string, halfStep?: boolean) => boolean;

  className?: string;
}

export function PositionViz({
  value,
  options,
  label,
  info,
  match,
  icon: Icon,
  format,
  className,
}: PositionVizProps): React.ReactElement {
  const fullOptions = options.map((o) =>
    typeof o === "string" ? { label: o } : o,
  );

  return (
    <div
      className={twMerge(
        "w-fill my-2 rounded-xs border border-black bg-white",
        className,
      )}
    >
      <div className="flex items-start bg-black px-2 text-white">
        <div className="flex items-center space-x-1 py-1.5">
          {!!Icon && <Icon className="size-3.5" />}
          <div className="pr-1 font-mono text-xs font-bold uppercase leading-none">
            {label}
          </div>
        </div>
        <div className="py-0.5 leading-none text-xs">
          {!!info && <InfoTooltip dark size="S" info={info} />}
        </div>
      </div>
      <div className="flex flex-col py-2">
        {fullOptions.map((option) => (
          <PositionVizStop
            key={option.label}
            option={option}
            match={match}
            format={format}
            value={value}
          />
        ))}
      </div>
    </div>
  );
}

interface PositionVizStopProps
  extends Pick<PositionVizProps, "match" | "format"> {
  value?: string;
  option: Option;
}

function PositionVizStop({
  option,
  match = (o, v) => o === v,
  value,
  format = (v, _) => v,
}: PositionVizStopProps): React.ReactElement {
  const { label, halfStep = false } = option;

  const matched = match(label, value, halfStep);

  return (
    <div
      className={twMerge(
        "px-2 font-mono text-xs font-light leading-tight text-zinc-600",
        matched && "bg-primary",
      )}
    >
      {/*marker*/}
      {/*label*/}
      {!halfStep || matched ? (
        <div
          className={twMerge(
            "flex items-center space-x-1 text-zinc-600",
            matched && "font-bold text-black",
          )}
        >
          <div className="flex w-3 flex-col items-center">
            {matched ? (
              <TbSquareRotatedFilled className="" />
            ) : (
              <TbCircleFilled className="size-2" />
            )}
          </div>
          <div> {format(option.label, halfStep)}</div>
        </div>
      ) : null}
    </div>
  );
}
