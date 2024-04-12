"use client";

import type { DatastoreRecord } from "@wprdc/types";
import type { Selection } from "react-aria-components";
import { Group, Label, ListBox } from "react-aria-components";
import { useMemo, useState } from "react";
import { TbCheck, TbX } from "react-icons/tb";
import { Button, Typography } from "../../components";
import type { FieldPickerProps } from "./types";
import { FieldPickerItem } from "./FieldPickerItem";

export function FieldPicker<T extends DatastoreRecord>({
  fields,
  selection,
  onSelectionChange,
  ...props
}: FieldPickerProps<T>): React.ReactElement {
  const [internalSelection, setInternalSelection] = useState<Selection>(
    new Set(),
  );

  function updateSelection(sel: Selection): void {
    setInternalSelection(sel);
    if (onSelectionChange) onSelectionChange(sel);
  }

  function handleSelectionChange(sel: Selection): void {
    updateSelection(sel);
  }

  function handleSelectAll(): void {
    updateSelection("all");
  }

  function handleClearSelection(): void {
    updateSelection(new Set());
  }

  const selectionCount: string = useMemo(() => {
    if (typeof internalSelection === "string") return String(fields.length);
    return String(internalSelection.size);
  }, [fields.length, internalSelection]);

  // use controlled state if available
  const _selection = selection ?? internalSelection;

  return (
    <Group className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between">
        <Label>
          <Typography.Label>Select field(s)</Typography.Label>
        </Label>
        <div className="flex">
          <Button
            className="flex items-center border-green-800 hover:bg-green-700/20"
            dense
            onPress={handleSelectAll}
          >
            <span>
              <TbCheck className="size-4 text-green-700" />
            </span>
            All
          </Button>
          <Button
            className="flex items-center border-red-900 hover:bg-red-800/20"
            dense
            onPress={handleClearSelection}
          >
            <span>
              <TbX className="size-4 text-red-800" />
            </span>
            Clear
          </Button>
        </div>
      </div>

      <ListBox
        {...props}
        className="w-full flex-grow overflow-auto rounded-sm border border-stone-400 p-1"
        onSelectionChange={handleSelectionChange}
        selectedKeys={_selection}
        selectionMode="multiple"
      >
        {fields.map((field) => (
          <FieldPickerItem
            field={field}
            id={String(field.id)}
            key={String(field.id)}
          />
        ))}
      </ListBox>

      <div className="w-full text-right text-xs">
        {selectionCount} field{selectionCount === "1" ? "" : "s"} selected
      </div>
    </Group>
  );
}
