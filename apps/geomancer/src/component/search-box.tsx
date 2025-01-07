"use client";

import {
  Button,
  ComboBox,
  Group,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  Popover,
} from "react-aria-components";
import { TbCheck, TbSelect } from "react-icons/tb";

export interface SearchBoxItem {
  id: string;
  name: string;
  description?: string;
}

export interface SearchBoxProps<T extends SearchBoxItem = SearchBoxItem> {
  items: T[];
  label: string;
}

export function SearchBox({ items, label }: SearchBoxProps) {
  return (
    <ComboBox className="group/search flex w-[200px] flex-col gap-1">
      <Label className="cursor-default font-mono text-black">Search</Label>
      <Group className="flex rounded-md bg-white bg-opacity-90 shadow-md ring-1 ring-black/10 transition focus-within:bg-opacity-100 focus-visible:ring-2 focus-visible:ring-black">
        <Input className="w-full flex-1 border-none bg-transparent px-3 py-2 text-base leading-5 text-gray-900 outline-none" />
        <Button className="pressed:bg-sky-100 flex items-center rounded-r-md border-0 border-l border-solid border-l-sky-200 bg-transparent px-3 text-gray-700 transition">
          <TbSelect />
        </Button>
      </Group>
      <Popover className="entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out max-h-60 w-[--trigger-width] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5">
        <ListBox className="p-1 outline-none" items={items}>
          {(item) => (
            <SearchItem textValue={item.name}>
              <span className="truncate">{item.name}</span>
            </SearchItem>
          )}
        </ListBox>
      </Popover>
    </ComboBox>
  );
}

function SearchItem(props: ListBoxItemProps & { children: React.ReactNode }) {
  return (
    <ListBoxItem {...props} className="text-red-600">
      {({ isSelected }) => (
        <>
          <span className="group-selected/item:font-medium flex flex-1 items-center gap-3 truncate font-normal">
            {props.children}
          </span>
          {isSelected && (
            <span className="flex w-5 items-center text-sky-600 group-focus:text-white">
              <TbCheck />
            </span>
          )}
        </>
      )}
    </ListBoxItem>
  );
}
