"use client";

/**
 *
 * ColorPicker
 *
 * Composite interface for selecting colors
 *
 **/
import {
  DialogTrigger,
  Popover,
  ColorPicker as RAColorPicker,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { defaultSwatchCollection } from "../../util/color";
import { Button } from "../button";
import { Dialog } from "../dialog";
import { Typography } from "../typography";
import { ColorArea } from "./ColorArea";
import { ColorField } from "./ColorField";
import type { ColorPickerProps } from "./ColorPicker.types";
import { ColorSlider } from "./ColorSlider";
import { ColorSwatch } from "./ColorSwatch";
import { ColorSwatchPicker } from "./ColorSwatchPicker";

export function ColorPicker({
  children,
  label,
  variant = "default",
  className,
  ...props
}: ColorPickerProps): React.ReactElement {
  return (
    <RAColorPicker {...props}>
      <DialogTrigger>
        {variant === "default" && (
          <Button className={twMerge("", className)}>
            <div className="flex items-center space-x-1.5">
              <ColorSwatch className="size-4 rounded border border-transparent" />
              <span className="leading-none">{label}</span>
            </div>
          </Button>
        )}
        {variant === "no-text" && (
          <Button
            className={twMerge("w-40 py-1.5", className)}
            aria-label={label}
          >
            <ColorSwatch className="h-3 w-full rounded border" />
          </Button>
        )}
        {variant === "labelled" && (
          <div>
            <Typography.Label>{label}</Typography.Label>
            <Button
              className={twMerge("h-8 w-40 py-1.5", className)}
              aria-label={label}
            >
              <ColorSwatch className="h-3 w-full rounded border" />
            </Button>
          </div>
        )}

        <Popover placement="bottom start">
          {children ?? (
            <Dialog className="flex flex-col space-y-2 bg-white shadow-md">
              <ColorArea
                colorSpace="hsb"
                xChannel="saturation"
                yChannel="brightness"
              />
              <ColorSlider colorSpace="hsb" channel="hue" />
              <ColorField label="Hex" />
              <ColorSwatchPicker
                className="max-w-40"
                colors={defaultSwatchCollection}
              />
            </Dialog>
          )}
        </Popover>
      </DialogTrigger>
    </RAColorPicker>
  );
}
