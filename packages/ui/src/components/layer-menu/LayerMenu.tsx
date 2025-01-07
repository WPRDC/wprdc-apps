"use client";

/**
 *
 * LayerMenu
 *
 * Menu for users to define style and data properties for a map layer.
 *
 **/
import { type LayerConfig, SymbologyMode } from "@wprdc/types";
import { useId, useReducer } from "react";
import { Heading } from "../heading";
import type { LayerMenuProps } from "./LayerMenu.types";
import { SolidMenu } from "./symbology-menus/SolidMenu";

// import layer = validateStyleMin.layer;

interface ClearAction {
  type: "cleared";
  field: keyof LayerConfig;
}

interface ChangeAction {
  type: "changed";
  field: keyof LayerConfig;
  value: LayerConfig;
}

type Action<T = unknown> = ChangeAction | ClearAction;

export function LayerMenu({
  defaultConfig,
}: LayerMenuProps): React.ReactElement {
  const id = useId();

  const [layerConfig, dispatch] = useReducer<
    LayerConfig,
    [Action<LayerConfig>]
  >(layerReducer, defaultConfig);

  function layerReducer(config: LayerConfig, action: Action): LayerConfig {
    switch (action.type) {
      case "cleared":
        return { ...config, [action.field]: defaultConfig[action.field] };
      case "changed":
        return { ...config, [action.field]: action.value };
    }
  }

  function updateField(field: keyof LayerConfig) {
    return (value: LayerConfig) => {
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
