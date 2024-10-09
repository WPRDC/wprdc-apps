"use client";

import {
  Label,
  ColorSlider as RAColorSlider,
  SliderOutput,
  SliderTrack,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { Typography } from "../typography";
import { type ColorSliderProps } from "./ColorPicker.types";
import { ColorThumb } from "./ColorThumb";

export function ColorSlider({
  label,
  className,
  showValue = false,
  ...props
}: ColorSliderProps): React.ReactElement {
  return (
    <RAColorSlider {...props} className={twMerge("", className)}>
      <div className="flex justify-between">
        {label ? (
          <Typography.Label>
            <Label>{label}</Label>
          </Typography.Label>
        ) : null}
        {showValue ? <SliderOutput className="font-mono text-xs" /> : null}
      </div>
      <SliderTrack
        className={twMerge(
          "rounded border border-stone-500 orientation-horizontal:h-5",
          className,
        )}
        style={({ defaultStyle }) => ({
          background: `${defaultStyle.background},
            repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 12px 12px`,
        })}
      >
        <ColorThumb className="top-1/2" />
      </SliderTrack>
    </RAColorSlider>
  );
}
