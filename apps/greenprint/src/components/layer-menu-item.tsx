"use client";

import {
  Button,
  Dialog,
  DialogTrigger,
  Header,
  ListBoxItem,
  ListBoxItemProps,
  OverlayArrow,
  Popover,
  Text,
} from "react-aria-components";
import { LayerMenuItemOptions } from "@/types";
import { Avatar } from "@/components/avatar";
import { TbInfoCircle, TbSquare, TbSquareCheckFilled } from "react-icons/tb";

export interface LayerMenuItemProps
  extends ListBoxItemProps, LayerMenuItemOptions {}

export function LayerMenuItem(props: LayerMenuItemProps) {
  const { id, name, geoType, extent, publisher, ...rest } = props;

  return (
    <ListBoxItem
      id={id}
      textValue={name}
      {...rest}
      className="group selected:bg-blue-50 flex cursor-pointer items-center border-b border-slate-300 px-1 py-1.5 first-of-type:border-t hover:bg-gray-50"
    >
      <div className="mr-2 ml-1 flex-shrink-0 text-blue-800">
        <TbSquareCheckFilled className="group-selected:block hidden h-5 w-5" />
        <TbSquare className="group-selected:hidden block h-5 w-5" />
      </div>

      <Avatar geoType={geoType} className="h-8 w-8 flex-shrink-0" />

      <div className="flex-grow overflow-x-hidden px-2">
        <div className="truncate text-sm" title={name}>
          {name}
        </div>
        <Text
          slot="description"
          className="block text-xs text-gray-600"
          aria-label="publisher"
        >
          {publisher?.name}
        </Text>
      </div>

      <div className="mr-1 flex flex-shrink-0 items-center">
        <DialogTrigger>
          <Button
            aria-label="Layer Details"
            className="visible:outline rounded-full leading-none text-blue-800 transition ease-in-out outline-none hover:text-blue-400"
            onPress={() => console.log(`Info for ${name}...`)}
          >
            <TbInfoCircle className="box-content h-5 w-5" />
          </Button>
          <Popover
            className={({ isEntering, isExiting }) =>
              `group placement-top:mb-2 placement-bottom:mt-2 rounded-sm bg-white p-3 ring-1 ring-black/10 drop-shadow-lg ${
                isEntering
                  ? "animate-in fade-in placement-top:slide-in-from-bottom-1 placement-bottom:slide-in-from-top-1 duration-200 ease-out"
                  : ""
              } ${
                isExiting
                  ? "animate-out fade-out placement-top:slide-out-to-bottom-1 placement-bottom:slide-out-to-top-1 duration-150 ease-in"
                  : ""
              }`
            }
          >
            <OverlayArrow>
              <svg
                viewBox="0 0 12 12"
                className="group-placement-bottom:rotate-180 block h-4 w-4 fill-white"
              >
                <path d="M0 0L6 6L12 0" />
              </svg>
            </OverlayArrow>

            <Dialog className="outline-none">
              <Header className="mb-1 text-xs font-bold text-gray-500">
                Details
              </Header>
              <dl className="text-sm">
                <div className="">
                  <dt className="mr-1 inline-block font-semibold after:content-[':']">
                    Publisher
                  </dt>
                  <dd className="inline-block">{publisher.name}</dd>
                </div>
                <div className="">
                  <dt className="mr-1 inline-block font-semibold after:content-[':']">
                    Extent
                  </dt>
                  <dd className="inline-block">{extent}</dd>
                </div>
              </dl>
            </Dialog>
          </Popover>
        </DialogTrigger>
      </div>
    </ListBoxItem>
  );
}
