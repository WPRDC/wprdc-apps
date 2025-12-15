"use client";

import type { AsyncListData, SelectionMode } from "react-stately";
import { Selection, useAsyncList } from "react-stately";
import type { OwnerSearchRow } from "@wprdc/types";
import {
  Autocomplete,
  Input,
  ListBox,
  ListBoxItem,
  SearchField,
  Text,
} from "react-aria-components";
import { BiSearchAlt2 } from "react-icons/bi";
import { useCallback } from "react";

const BASE_URL = process.env.BASE_URL ?? "";

export interface OwnerSearchProps {
  onSelectionChangeAction: (address: string) => void;
  selectedAddress?: string;
  selectionMode?: SelectionMode;
}

export function OwnerSearch({
  onSelectionChangeAction,
  selectionMode = "single",
}: OwnerSearchProps): React.ReactElement {
  const list: AsyncListData<OwnerSearchRow> = useAsyncList<OwnerSearchRow>({
    async load({ signal, filterText }) {
      if (!filterText) return { items: [] };

      const response = await fetch(
        BASE_URL + `/api/parcels/owners/search?q=${filterText ?? ""}`,
        {
          signal,
        },
      );
      const { results } = (await response.json()) as {
        results: OwnerSearchRow[];
      };
      return {
        items: results,
      };
    },
  });

  const handleSelectionChange = useCallback(
    (keys: Selection): void => {
      // clear search
      list.setFilterText("");

      // extract selected key and navigate
      const key =
        typeof keys === "string" ? list.items[0] : Array.from(keys)[0];
      if (key) onSelectionChangeAction(key.toString());
    },
    [list, onSelectionChangeAction],
  );

  return (
    <div className="relative w-fit">
      <Autocomplete
        inputValue={list.filterText}
        onInputChange={list.setFilterText}
      >
        <SearchField className="flex w-96 min-w-52 text-lg">
          <div className="flex h-12 items-center rounded-l-md border-r border-stone-800 bg-stone-900">
            <BiSearchAlt2 className="mx-1 size-8 text-white" />
          </div>
          <Input
            className="w-full rounded-r border-2 border-stone-800 px-2 py-1"
            placeholder="Search by address or parcel ID"
          />

          {list.isLoading && (
            <div className="absolute right-2 flex h-full items-center">
              <svg
                className="h-5 w-5 animate-spin text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#000"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="#000"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
        </SearchField>
        {list.items.length > 0 && (
          <ListBox
            className="absolute z-50 w-full border border-black bg-white"
            selectionMode={selectionMode}
            items={list.items}
            onSelectionChange={handleSelectionChange}
            shouldFocusOnHover
          >
            {(item: OwnerSearchRow) => (
              <ListBoxItem
                className="group cursor-pointer px-2 py-2 focus:bg-stone-200"
                id={item.ownerAddress}
                textValue={item.ownerAddress}
              >
                <Text
                  className="block truncate leading-none font-semibold"
                  slot="label"
                >
                  {item.ownerAddress}
                </Text>
                <Text
                  className="ml-9 block font-mono text-xs text-gray-800"
                  slot="description"
                >
                  {item.count} parcel{item.count === 1 ? "" : "s"} owned
                </Text>
              </ListBoxItem>
            )}
          </ListBox>
        )}
      </Autocomplete>
    </div>
  );
}
