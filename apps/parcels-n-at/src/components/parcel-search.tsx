"use client";

import type { AsyncListData, Key } from "react-stately";
import { useAsyncList } from "react-stately";
import type { RankedParcelIndex } from "@wprdc/types";
import { ListBoxItem, Text } from "react-aria-components";
import { ComboBox } from "@wprdc/ui";
import { useRouter } from "next/navigation";
import { getClassificationColor } from "@/components/parcel-dashboard";

export function ParcelSearch(): React.ReactElement {
  const router = useRouter();

  const list: AsyncListData<RankedParcelIndex> =
    useAsyncList<RankedParcelIndex>({
      async load({ signal, filterText }) {
        const response = await fetch(
          `/api/parcels/search?q=${filterText ?? ""}`,
          {
            signal,
          },
        );
        const { results } = (await response.json()) as {
          results: RankedParcelIndex[];
        };
        return {
          items: results,
        };
      },
    });

  function handleSelectionChange(key: Key | null): void {
    list.setFilterText("");
    if (key) router.push(`/explore?parcel=${key.toString()}&zoompan=1`);
  }

  return (
    <ComboBox<RankedParcelIndex>
      className="w-80 min-w-52 text-xl"
      inputValue={list.filterText}
      items={list.items}
      label="Search Address or Parcel ID"
      onInputChange={(v: string) => {
        list.setFilterText(v);
      }}
      onSelectionChange={handleSelectionChange}
      placeholder="Search address or parcel ID"
      variant="search-nav"
      isLoading={list.isLoading}
    >
      {(item: RankedParcelIndex) => (
        <ListBoxItem
          className="group cursor-pointer"
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
                <div className="font-semibold leading-none">
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
