"use client";

import type { Selection } from "react-aria-components";
import { MenuTrigger } from "react-aria-components";
import { Button } from "../button";
import { GridMenu, GridMenuItem } from "../grid-menu";
import { Popover } from "../popover";
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
      <Button style={{ background: "white" }}>Switch Basemap</Button>
      <Popover
        className="rounded-sm bg-white p-2 shadow-md border border-stone-800"
        placement="bottom right"
      >
        <GridMenu
          columns={3}
          onSelectionChange={handleSelection}
          orientation="grid"
          selectedKeys={[selectedBasemap]}
          size="L"
        >
          {Object.entries(basemaps).map(([name, { label, image }]) => (
            <GridMenuItem id={name} image={image} key={name}>
              {label}
            </GridMenuItem>
          ))}
        </GridMenu>
      </Popover>
    </MenuTrigger>
  );
}
