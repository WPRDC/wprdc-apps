"use client";

import {
  CategorySymbologyMenuOptions,
  FixedSymbologyMenuOptions,
  SymbologyMenuMode,
  SymbologyMenuProps,
  ZoomSymbologyMenuOptions,
} from "../LayerMenu.types.ts";
import { StyleValue } from "@wprdc/types";
import { ToggleButton, ToggleButtonGroup } from "react-aria-components";
import { useEffect } from "react";
import { FixedSymbologyMenu } from "./FixedSymbologyMenu.tsx";
import { CategorySymbologyMenu } from "./CategorySymbologyMenu.tsx";
import { ZoomMenu } from "./ZoomMenu.tsx";

export function SymbologyMenu<T extends StyleValue>({
  options,
  onModeChange,
  onChange: onValueChange,
  categories,
}: SymbologyMenuProps<T>) {
  const { value, mode } = options;

  // ensure fixed mode if categories are not provided
  useEffect(() => {
    if (!categories && mode !== "fixed") onModeChange("fixed");
  }, [categories]);

  return (
    <div>
      {(!!categories || options.mode === "zoom") && (
        <div>
          <ToggleButtonGroup
            selectedKeys={[mode]}
            onSelectionChange={(keys) =>
              onModeChange(Array.from(keys)[0] as SymbologyMenuMode)
            }
            selectionMode="single"
            className="font-mono text-xs"
          >
            <ToggleButton
              id="fixed"
              style={{
                background: mode === "fixed" ? "#FCEC52" : "transparent",
              }}
              className="rounded-l-md border border-r-0 border-black px-0.5 selected:fill-primary"
            >
              Fixed
            </ToggleButton>
            {options.mode === "zoom" && (
              <ToggleButton
                id="zoom"
                style={{
                  background: mode === "zoom" ? "#FCEC52" : "transparent",
                }}
                className="border-y border-black px-0.5 selected:fill-primary"
              >
                By Zoom
              </ToggleButton>
            )}
            {!!categories && (
              <ToggleButton
                id="category"
                style={{
                  background: mode === "category" ? "#FCEC52" : "transparent",
                }}
                className="rounded-r-md border border-l-0 border-black px-0.5 selected:fill-primary"
              >
                By Value
              </ToggleButton>
            )}
          </ToggleButtonGroup>
        </div>
      )}
      <div>
        {mode === "fixed" && (
          <FixedSymbologyMenu<T>
            options={options}
            onChange={onValueChange as FixedSymbologyMenuOptions<T>["onChange"]}
          />
        )}

        {mode === "zoom" && (
          <div>
            <ZoomMenu
              field=""
              units=""
              options={options}
              onChange={onValueChange as ZoomSymbologyMenuOptions["onChange"]}
            />
          </div>
        )}

        {mode === "category" && (
          <CategorySymbologyMenu<T>
            options={options}
            onChange={
              onValueChange as CategorySymbologyMenuOptions<T>["onChange"]
            }
            categories={categories}
          />
        )}
      </div>
    </div>
  );
}
