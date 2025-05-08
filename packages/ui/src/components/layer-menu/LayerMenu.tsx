"use client";

/**
 *
 * LayerMenu
 *
 * Menu for users to define style and data properties for a map layer.
 *
 **/
import {
  CategoryOptionsRecord,
  CategorySymbologyConfig,
  type LayerConfig,
} from "@wprdc/types";
import { Heading } from "../heading";
import type { LayerMenuProps } from "./LayerMenu.types";
import { Button } from "../button";
import { PressEvent } from "@react-types/shared";
import { useState } from "react";
import { CategoryMenu } from "./CategoryMenu.tsx";
import { ModeMenu } from "./ModeMenu.tsx";
import { SymbologyMenu } from "./symbology/SymbologyMenu.tsx";
import { DEFAULT_COLOR_OPTION, DEFAULT_VALUES, STYLE_KEYS } from "./util.ts";

export function LayerMenu({
  defaultConfig,
  onSubmit,
  onClose,
}: LayerMenuProps): React.ReactElement {
  const [layerConfig, setLayerConfig] = useState<LayerConfig>(defaultConfig);

  function handleSubmit(e: PressEvent) {
    onSubmit(layerConfig);
    onClose();
  }

  function handleUpdate(layer: LayerConfig) {
    setLayerConfig(layer);
  }

  const handleCategoryChange = (
    field: string,
    categories: CategoryOptionsRecord[],
  ) => {
    if (layerConfig.symbology.mode === "category") {
      // update field and categories
      let newConfig: LayerConfig = {
        ...layerConfig,
        symbology: {
          ...layerConfig.symbology,
          mode: "category",
          field,
          categories,
        } as CategorySymbologyConfig,
      };

      // also need to update categories in symbology config
      // determine change in categories
      const oldCatIDs: string[] =
        layerConfig.symbology.categories?.map((c) => c.value) ?? [];
      const newCatIDs: string[] = categories.map((c) => c.value);
      const removedCategoryIDs = oldCatIDs.filter(
        (c) => !newCatIDs.includes(c),
      );
      const newCategoryIDs = newCatIDs.filter((c) => !oldCatIDs.includes(c));

      for (let key of STYLE_KEYS) {
        // copy symbology,
        const sym = layerConfig.symbology[key];

        if (sym?.mode === "category") {
          const newValues = Object.fromEntries(
            // first filter out removed
            Object.entries(sym.value).filter(
              ([k]) => !removedCategoryIDs.includes(k),
            ),
          );

          // add new categories
          for (let newKey of newCategoryIDs) {
            newValues[newKey] = DEFAULT_VALUES[key];
          }

          // update new config record
          newConfig.symbology[key] = {
            mode: "category",
            submode: "simple",
            value: newValues
          };
        }
      }

      setLayerConfig(newConfig);
    }

    // replace reference with mutated copy
  };

  const handleFieldChange =
    (
      field: keyof Omit<
        LayerConfig["symbology"],
        "mode" | "field" | "categories"
      >,
    ) =>
    (value: any) => {
      handleUpdate({
        ...layerConfig,
        symbology: {
          ...layerConfig.symbology,
          [field]: {
            ...layerConfig.symbology[field],
            value: value,
          },
        },
      });
    };

  // for single symbology option
  const handleSymbologyModeChange =
    (
      field: keyof Omit<
        LayerConfig["symbology"],
        "mode" | "field" | "categories"
      >,
    ) =>
    (value: any) => {
      handleUpdate({
        ...layerConfig,
        symbology: {
          ...layerConfig.symbology,
          [field]: {
            ...layerConfig.symbology[field],
            mode: value,
          },
        },
      });
    };

  // layer-wide mode
  const handleModeChange = (selection: "simple" | "category") => {
    if (selection === "category")
      handleUpdate({
        ...layerConfig,
        symbology: {
          mode: selection,
          field: "",
          categories: [{ value: "", label: "" }],
        },
      });
    else
      handleUpdate({
        ...layerConfig,
        symbology: {
          mode: selection,
        },
      });
  };

  return (
    <div className="w-96">
      <Heading level={1} className="mb-1 text-xl">
        Configure Layer Symbology
      </Heading>


      <Heading level={2} className="mb-1 text-xl">
        Mode
      </Heading>
      <ModeMenu
        selection={layerConfig.symbology.mode}
        onSelectionChange={handleModeChange}
      />
      {layerConfig.symbology.mode === "category" && (
        <CategoryMenu
          field={layerConfig.symbology.field}
          categories={layerConfig.symbology.categories}
          onChange={handleCategoryChange}
        />
      )}

      {/* Symbology */}
      <section>
        <Heading level={2} className="mb-1 text-xl">
          Symbology
        </Heading>

        {/* COLOR */}
        <Heading level={3} className="my-0 text-lg">
          Color
        </Heading>
        <SymbologyMenu<string>
          options={layerConfig.symbology.color ?? DEFAULT_COLOR_OPTION}
          onChange={handleFieldChange("color")}
          onModeChange={handleSymbologyModeChange("color")}
          categories={layerConfig.symbology.categories}
        />

        {/*  */}
      </section>

      {/* Tileserver Options */}
      {/* Label */}

      {/* Interaction Options (save for later)*/}

      {/* Controls */}
      <div className="mt-12 flex justify-end gap-4">
        <Button variant="default" onPress={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onPress={handleSubmit}>
          Submit Changes
        </Button>
      </div>
    </div>
  );
}
