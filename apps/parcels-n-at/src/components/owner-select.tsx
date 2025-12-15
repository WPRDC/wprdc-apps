import { Button, ListBox, Typography } from "@wprdc/ui";
import { Group, Label, ListBoxItem, Selection } from "react-aria-components";
import React, { useMemo } from "react";
import { Key, ListOptions, useListData } from "react-stately";
import { useId } from "react-aria";
import { TbX } from "react-icons/tb";
import { OwnerSearch } from "@/components/owner-search.tsx";

export interface OwnerSelectItem {
  address: string;
}
export interface OwnerSelectProps extends ListOptions<OwnerSelectItem> {
  label: string;
  onChange?: (selection: string[]) => void;
}

export function OwnerSelect({ label, onChange, ...props }: OwnerSelectProps) {
  const labelID = useId();
  const list = useListData<OwnerSelectItem>({
    ...props,
    getKey: (item) => item.address,
  });

  function handleClearList() {
    list.remove(...list.items.map((item) => item.address));
    if (onChange) {
      onChange([]);
    }
  }

  function handleSelectionChange(selection: Selection): void {
    list.setSelectedKeys(selection);
  }

  function handleAddItem(address: string) {
    if (onChange) {
      onChange([...list.items.map((item) => item.address), address]);
    }
    if (!list.getItem(address)) list.append({ address });
  }

  return (
    <Group className="flex flex-col">
      <Label className="text font-bold text-stone-600 uppercase">{label}</Label>
      <OwnerSearch onSelectionChangeAction={handleAddItem} />

      <Label id={labelID} className="mt-2">
        Selected Owners
      </Label>
      <div className="w-full max-w-96 rounded-sm border border-stone-800 p-px">
        <ListBox
          className="max-h-64 w-full cursor-default overflow-auto text-sm"
          aria-labelledby={labelID}
          selectionMode="multiple"
          items={list.items}
          selectedKeys={list.selectedKeys}
          onSelectionChange={handleSelectionChange}
          renderEmptyState={() => (
            <Typography.Note className="mx-1">Nothing selected</Typography.Note>
          )}
        >
          {(item) => (
            <ListBoxItem
              key={item.address}
              id={item.address}
              className="aria-selected:bg-wprdc-200 aria-selected:hover:bg-wprdc-300 px-1 hover:bg-stone-100"
            >
              {item.address}
            </ListBoxItem>
          )}
        </ListBox>
      </div>
      <div className="flex space-x-2 pt-px">
        <Button
          dense
          className="flex items-center border-red-900 hover:bg-red-800/20"
          onPress={handleClearList}
        >
          <span>
            <TbX className="size-4 text-red-800" />
          </span>
          Clear All
        </Button>
        <Button
          dense
          className="flex items-center border-red-900 hover:bg-red-800/20"
          onPress={list.removeSelectedItems}
        >
          <span>
            <TbX className="size-4 text-red-800" />
          </span>
          Remove Selected Addresses
        </Button>
      </div>
      <div className="w-full text-right text-xs"></div>
    </Group>
  );
}
