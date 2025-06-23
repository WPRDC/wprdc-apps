"use client";

import type { AsyncListData, Key } from "react-stately";
import { useAsyncList } from "react-stately";
import type { OwnerSearchRow } from "@wprdc/types";
import { ListBoxItem, Text } from "react-aria-components";
import { ComboBox } from "@wprdc/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const BASE_URL = process.env.BASE_URL ?? "";

export function OwnerSearch(): React.ReactElement {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();


  const list: AsyncListData<OwnerSearchRow> =
    useAsyncList<OwnerSearchRow>({
      async load({ signal, filterText }) {
        if (!filterText) return {items: []}

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

  function handleSelectionChange(key: Key | null): void {
    list.setFilterText("");
    if (key) {
      // set/update ownerAddr param
      const params = new URLSearchParams(searchParams);
      params.delete("ownerAddr")
      params.append("ownerAddr", key.toString())

      router.push(`${pathName}?${params.toString()}`);
    }
  }

  return (
    <ComboBox<OwnerSearchRow>
      className="w-full text-sm"
      inputValue={list.filterText}
      items={list.items}
      onInputChange={(v: string) => {
        list.setFilterText(v);
      }}
      onSelectionChange={handleSelectionChange}
      placeholder="Search owner address to highlight"
      isLoading={list.isLoading}
    >
      {(item: OwnerSearchRow) => (
        <ListBoxItem
          className="group cursor-pointer"
          id={item.ownerAddress}
          textValue={item.ownerAddress}
        >
          <div className="py-1 group-focus:bg-stone-200">
            <Text className="block truncate font-semibold leading-none" slot="label">
              {item.ownerAddress}
            </Text>
            <Text
              className="ml-9 block font-mono text-xs text-gray-800"
              slot="description"
            >
             {item.count} parcel{item.count === 1 ? '' : 's'} owned
            </Text>
          </div>
        </ListBoxItem>
      )}
    </ComboBox>
  );
}
