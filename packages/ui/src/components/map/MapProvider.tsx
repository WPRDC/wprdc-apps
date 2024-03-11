"use client";

import type { Selection } from "react-aria-components";
import { createContext, useState } from "react";
import type {
  LayerOptions,
  SymbologyProps,
  MapContextOptions,
} from "@wprdc/types";
import type { LayerMenuGroup, LayerProviderProps } from "./Map.types";

export const MapContext = createContext<MapContextOptions>({});

export function MapProvider({
  availableLayers,
  children,
  defaultSelection = {},
}: LayerProviderProps): React.ReactElement {
  const [selection, setSelection] =
    useState<Record<string, Selection>>(defaultSelection);

  const [selectedLayers, setSelectedLayers] = useState<
    LayerOptions<SymbologyProps>[]
  >([]);

  /**
   * Callback fired when the selection of layers in the map layer menu are changed
   *
   * Updates sets of selected layers.
   * */
  const handleSelectionChange =
    (category: string) =>
    (sel: Selection): void => {
      const newSelection = { ...selection, [category]: sel };
      setSelection(newSelection);

      setSelectedLayers(
        Object.entries<LayerMenuGroup>(availableLayers).reduce<
          LayerOptions<SymbologyProps>[]
        >((acc, [sectionName, layerSection]) => {
          const groupSelection = newSelection[sectionName];
          if (groupSelection === "all") return [...acc, ...layerSection.layers];
          // filter layers based on selection
          const shownLayers = layerSection.layers.filter((l) =>
            groupSelection.has(l.slug),
          );
          return [...acc, ...shownLayers];
        }, []),
      );
    };

  return (
    <MapContext.Provider
      value={{
        selection,
        selectedLayers,
        onSelectionChange: handleSelectionChange,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
