"use client";

/**
 *
 * LayerMenu
 *
 * Menu for users to define style and data properties for a map layer.
 *
 **/
import { GeoType, SymbologyMode, type LayerConfig } from "@wprdc/types";
import * as React from "react";
import { useId, useReducer, type Reducer } from "react";
import { ColorPicker } from "../color-picker";
import { Heading } from "../heading";
import type { LayerMenuProps } from "./LayerMenu.types";
import { SolidMenu } from "./symbology-menus/SolidMenu";

// import layer = validateStyleMin.layer;

interface ClearAction {
  type: "cleared";
  field: keyof LayerConfig;
}

interface ChangeAction<T> {
  type: "changed";
  field: keyof LayerConfig;
  value: T;
}

type Action<T = unknown> = ChangeAction<T> | ClearAction;

export function LayerMenu({
  defaultConfig,
}: LayerMenuProps): React.ReactElement {
  const id = useId();

  const [layerConfig, dispatch] = useReducer<Reducer<LayerConfig, Action>>(
    layerReducer,
    defaultConfig,
  );

  function layerReducer(config: LayerConfig, action: Action): LayerConfig {
    switch (action.type) {
      case "cleared":
        return { ...config, [action.field]: defaultConfig[action.field] };
      case "changed":
        return { ...config, [action.field]: action.value };
    }
  }

  function updateField<T>(field: keyof LayerConfig) {
    return (value: T) => {
      dispatch({
        type: "changed",
        field,
        value,
      });
    };
  }

  return (
    <div>
      {/* Metadata */}

      {/* Symbology */}
      <section>
        <Heading>Symbology</Heading>
        {layerConfig.symbologyMode === SymbologyMode.Solid && (
          <SolidMenu value={layerConfig.symbology} geoType={layerConfig.type} />
        )}
      </section>

      {/* Tileserver Options */}

      {/* Main Color and Opacity */}

      {/* Border Color and Opacity (not for line layers) */}

      {/* Label */}

      {/* Interaction Options (save for later)*/}
    </div>
  );
}
