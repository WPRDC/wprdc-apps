"use client";

import type { AsyncListData } from "react-stately";
import { useAsyncList } from "react-stately";
import type { RankedParcelIndex } from "@wprdc/types";
import { ListBoxItem, Text } from "react-aria-components";
import { autocompleteParcelSearch } from "@wprdc/api";
import { ComboBox, getClassificationColor } from "@wprdc/ui";

const API_TOKEN = process.env.NEXT_PUBLIC_CKAN_API_TOKEN ?? "";

export function ParcelSearch(): React.ReactElement {
  const list: AsyncListData<RankedParcelIndex> =
    useAsyncList<RankedParcelIndex>({
      async load({ signal, filterText }) {
        const results = await autocompleteParcelSearch(filterText ?? "", 10, {
          signal,
          headers: { Authorization: API_TOKEN },
        });

        return {
          items: results,
        };
      },
    });

  return (
    <ComboBox<RankedParcelIndex>
      className="w-80 min-w-52"
      inputValue={list.filterText}
      items={list.items}
      label="Search Address or Parcel ID"
      onInputChange={(v: string) => {
        list.setFilterText(v);
      }}
    >
      {(item: RankedParcelIndex) => (
        <ListBoxItem
          className="group"
          href={`/parcel/${item.parcel_id}`}
          id={item.parcel_id}
          textValue={item.address}
        >
          <div className="py-1 group-focus:bg-stone-200">
            <div className="flex items-center overflow-hidden">
              <div
                className="ml-1 mr-2 h-6 w-6 rounded-sm border border-black font-mono font-bold"
                style={{
                  backgroundColor: getClassificationColor(item.class),
                }}
              >
                <div className="w-full text-center">
                  {item.class.substring(0, 1).toUpperCase()}
                </div>
              </div>
              <Text className="block truncate font-medium" slot="label">
                <div className=" font-medium leading-none">
                  {item.housenum} {item.street} {item.unit}
                </div>
                <div className="text-xs leading-none">
                  {item.city}, {item.state} {item.zip}
                </div>
              </Text>
            </div>
            <Text
              className="ml-9 block font-mono text-xs text-gray-800"
              slot="description"
            >
              {item.parcel_id}
            </Text>
          </div>
        </ListBoxItem>
      )}
    </ComboBox>
  );
}
