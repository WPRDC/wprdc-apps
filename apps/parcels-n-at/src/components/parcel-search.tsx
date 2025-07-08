"use client";

import type { AsyncListData } from "react-stately";
import { Selection, useAsyncList } from "react-stately";
import type { RankedParcelIndex } from "@wprdc/types";
import {
  Autocomplete,
  Input,
  ListBox,
  ListBoxItem,
  SearchField,
  Text,
} from "react-aria-components";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getClassificationColor } from "@/components/parcel-dashboard";
import { useCallback } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const BASE_URL = process.env.BASE_URL ?? "";

export function ParcelSearch(): React.ReactElement {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const list: AsyncListData<RankedParcelIndex> =
    useAsyncList<RankedParcelIndex>({
      async load({ signal, filterText }) {
        const response = await fetch(
          BASE_URL + `/api/parcels/search?q=${filterText ?? ""}`,
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

  const handleInputChange = useCallback(
    (text: string) => {
      list.setFilterText(text);
    },
    [list],
  );

  const handleSelectionChange = useCallback(
    (keys: Selection): void => {
      // clear search
      list.setFilterText("");

      const params = new URLSearchParams(searchParams);
      params.delete("zoomPan");
      params.append("zoomPan", '1')

      // extract selected key and navigate
      const key =
        typeof keys === "string" ? list.items[0] : Array.from(keys)[0];

      params.delete("parcel")
      params.append('parcel', key.toString());

      if (key) router.push(`/explore?${params.toString()}`);
    },
    [list],
  );

  return (
    <div className="relative w-fit">
      <Autocomplete
        inputValue={list.filterText}
        onInputChange={handleInputChange}
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

        { list.items.length > 0 &&
          <ListBox
            className="absolute z-50 w-full border border-black bg-white"
            selectionMode="single"
            items={list.items}
            onSelectionChange={handleSelectionChange}
            shouldFocusOnHover
          >
            {(item) => (
              <ListBoxItem
                className="group w-full cursor-pointer focus:bg-stone-200"
                id={item.parcel_id}
                textValue={item.address}

              >
                <div className="py-1 ">
                  <div className="flex items-center overflow-hidden">
                    <div
                      className="mx-2 mt-1 flex size-8 items-center rounded-sm border border-black"
                      style={{
                        backgroundColor: getClassificationColor(item.class, true),
                      }}
                    >
                      <div className="w-full text-center font-mono text-xl font-bold text-white">
                        {item.class.substring(0, 1).toUpperCase()}
                      </div>
                    </div>
                    <Text
                      className="block truncate text-base font-medium"
                      slot="label"
                    >
                      <div className="font-semibold leading-none">
                        {item.housenum} {item.street} {item.unit}
                      </div>
                      <div className="text-xs leading-none">
                        {item.city}, {item.state} {item.zip}
                      </div>
                    </Text>
                  </div>

                  <Text
                    className="ml-12 block font-mono text-xs text-gray-800"
                    slot="description"
                  >
                    {item.parcel_id}
                  </Text>
                </div>
              </ListBoxItem>
            )}
          </ListBox>
        }
      </Autocomplete>
    </div>
  );
}
