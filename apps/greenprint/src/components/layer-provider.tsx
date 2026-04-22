"use client";

import { LayerCategory, LayerOptions, VisualOptions } from "@/types";
import { Selection } from "react-aria-components";
import { createContext, PropsWithChildren, useState } from "react";
import availableLayers from "@/layers";

interface LayerSelectionContext {
  selection?: Record<LayerCategory, Selection>;
  selectedLayers?: LayerOptions<VisualOptions>[];
  onSelectionChange?: (category: LayerCategory) => (sel: Selection) => void;
}

export const LayersContext = createContext<LayerSelectionContext>({});

export function LayerProvider({ children }: PropsWithChildren) {
  const [selection, setSelection] = useState<Record<LayerCategory, Selection>>({
    interactive: new Set([]),
    base: new Set([]),
    "natural-features": new Set([]),
    "urban-green-features": new Set([]),
    "urban-green-features-planned": new Set([]),
    transportation: new Set([]),
    other: new Set([]),
  });

  const [selectedLayers, setSelectedLayers] = useState<
    LayerOptions<VisualOptions>[]
  >([]);

  const handleSelectionChange =
    (category: LayerCategory) => (sel: Selection) => {
      const newSelection = { ...selection, [category]: sel };
      setSelection(newSelection);
      setSelectedLayers(
        Object.entries(availableLayers).reduce<LayerOptions<VisualOptions>[]>(
          (acc, [sectionName, layerSection]) => {
            const groupSelection = newSelection[sectionName as LayerCategory];
            if (groupSelection === "all")
              return [...acc, ...layerSection.layers];
            // filter layers based on selection
            const shownLayers = layerSection.layers.filter((l) =>
              groupSelection.has(l.slug),
            );
            return [...acc, ...shownLayers];
          },
          [],
        ),
      );
    };

  return (
    <LayersContext.Provider
      value={{
        selection: selection,
        selectedLayers: selectedLayers,
        onSelectionChange: handleSelectionChange,
      }}
    >
      {children}
    </LayersContext.Provider>
  );
}
