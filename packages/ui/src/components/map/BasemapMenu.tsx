import type { Selection } from "react-aria-components";
import { MenuTrigger } from "react-aria-components";
import { GridMenu, GridMenuItem } from "../grid-menu";
import { Button } from "../button";
import { basemaps } from "./basemaps";

export interface BasemapMenuProps {
  onSelection: (basemap: string) => void;
  selectedBasemap: string;
}

export function BasemapMenu({
  selectedBasemap,
  onSelection,
}: BasemapMenuProps): React.ReactElement {
  function handleSelection(selection: Selection): void {
    if (selection !== "all" && selection.size) {
      const selected = Array.from(selection)[0];
      if (typeof selected === "string") onSelection(selected);
    }
  }

  return (
    <MenuTrigger>
      <Button>Basemaps</Button>
      <GridMenu
        columns={3}
        onSelectionChange={handleSelection}
        orientation="grid"
        selectedKeys={[selectedBasemap]}
        size="L"
      >
        {Object.entries(basemaps).map(([name, { label }]) => (
          <GridMenuItem
            id={name}
            image={`/greenprint/basemaps/${name}-close.png`}
            key={name}
          >
            {label}
          </GridMenuItem>
        ))}
      </GridMenu>
    </MenuTrigger>
  );
}
