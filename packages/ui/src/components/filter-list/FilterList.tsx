"use client";

import { FilterListItem, FilterListProps } from "./FilterList.types.ts";
import { useListData } from "react-stately";
import React, { useMemo } from "react";

import { TextField } from "../text-field";
import {
  Group,
  Label,
  ListBox,
  ListBoxItem,
  Selection,
} from "react-aria-components";
import { useId } from "react-aria";
import { Button } from "../button";
import { TbX } from "react-icons/tb";

export function FilterList<T extends FilterListItem = FilterListItem>({
  label,
  selectionMode = "single",
  onChange,
  ...props
}: FilterListProps<T>) {
  const labelID = useId();
  const list = useListData<T>({
    ...props,
    filter: (item: T, filterText: string) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()),
  });

  function handleClearSelection() {
    handleSelectionChange(new Set());
  }

  function handleSelectionChange(selection: Selection): void {
    list.setSelectedKeys(selection);
    if (onChange) {
      if (selection === "all")
        onChange(list.items.map((item) => item.id.toString()));
      else onChange(Array.from(selection));
    }
  }

  const selectionCount = useMemo(() => {
    return list.selectedKeys === "all"
      ? list.items.length
      : list.selectedKeys.size;
  }, [list.selectedKeys, list.items]);

  return (
    <Group className="flex flex-col">
      <Label className="text font-bold text-stone-600 uppercase" id={labelID}>
        {label}
      </Label>

      <div className="">
        <TextField
          className="mb-1 w-full text-sm"
          label="Filter"
          onChange={list.setFilterText}
          value={list.filterText}
        />
      </div>
      <div className="rounded-sm border border-stone-800 p-px">
        <ListBox
          className="max-h-64 cursor-default overflow-auto text-sm"
          aria-labelledby={labelID}
          selectionMode={selectionMode}
          items={list.items}
          selectedKeys={list.selectedKeys}
          onSelectionChange={handleSelectionChange}
        >
          {(item) => (
            <ListBoxItem className="aria-selected:bg-wprdc-200 aria-selected:hover:bg-wprdc-300 px-1 hover:bg-stone-100">
              {item.name}
            </ListBoxItem>
          )}
        </ListBox>
      </div>
      <div className="pt-px">
        <Button
          dense
          className="flex items-center border-red-900 hover:bg-red-800/20"
          onPress={handleClearSelection}
        >
          <span>
            <TbX className="size-4 text-red-800" />
          </span>
          Clear
        </Button>
      </div>
      <div className="w-full text-right text-xs">
        {selectionCount} field{selectionCount === 1 ? "" : "s"} selected
      </div>
    </Group>
  );
}
