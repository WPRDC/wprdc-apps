"use client";

import { LayerConfig } from "@wprdc/types";
import type { Selection } from "react-stately";
import { DialogTrigger, Heading, Label } from "react-aria-components";
import {
  A,
  Button,
  Content,
  Dialog,
  InfoTooltip,
  ListBox,
  ListBoxItem,
  Modal,
  ModalOverlay,
} from "@wprdc/ui";
import { BiCheck, BiMapAlt, BiX } from "react-icons/bi";
import { OwnerSearch } from "@/components/owner-search.tsx";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface LayerMenuProps {
  availableLayers: LayerConfig[];
  ownerAddress?: string;
  selectedLayers: string | string[];
}

export function LayerMenu({
  availableLayers,
  ownerAddress,
  selectedLayers,
}: LayerMenuProps) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const [currentSelection, setCurrentSelection] = useState<Selection>(
    new Set(Array.isArray(selectedLayers) ? selectedLayers : [selectedLayers]),
  );
  const [currentOwnerAddress, setCurrentOwnerAddress] = useState<
    string | undefined
  >(ownerAddress);

  function handleOwnerClear() {
    setCurrentOwnerAddress(undefined);
  }

  const handleOwnerSelection = useCallback((address: string) => {
    setCurrentOwnerAddress(address);
  }, []);

  function handleMenuSelection(selection: Selection) {
    setCurrentSelection(selection);
  }

  // on open, reset state
  useEffect(() => {
    if (dialogIsOpen) {
      setCurrentSelection(
        new Set(
          Array.isArray(selectedLayers) ? selectedLayers : [selectedLayers],
        ),
      );
      setCurrentOwnerAddress(ownerAddress);
    }
  }, [dialogIsOpen, ownerAddress, selectedLayers]);

  /** When submitting the form, generate query params and update the history  */
  const handleSubmit = (close: () => void) => () => {
    // owner address
    const params = new URLSearchParams(searchParams);
    params.delete("ownerAddr");
    if (currentOwnerAddress) params.append("ownerAddr", currentOwnerAddress);

    // context layers
    params.delete("selectedLayers");
    const submittedLayers =
      currentSelection === "all"
        ? availableLayers.map((l) => l.slug)
        : Array.from(currentSelection);

    submittedLayers.forEach((slug) => {
      params.append("selectedLayers", slug.toString());
    });

    // update with new params and close dialog
    router.push(`${pathName}?${params.toString()}`);
    close();
  };

  return (
    <div className="">
      <DialogTrigger onOpenChange={setDialogIsOpen}>
        <Button icon={BiMapAlt}>Select Layers</Button>
        <ModalOverlay isDismissable>
          <Modal
            isOpen={dialogIsOpen}
            isDismissable
            className="max-h-3/4 flex rounded-sm border border-stone-800 bg-white p-2 shadow"
          >
            <Dialog className="flex max-h-full flex-col overflow-hidden">
              {({ close }) => (
                <>
                  <Heading className="mb-4 text-xl font-bold">
                    Layer Options
                  </Heading>

                  <div className="flex grow flex-col overflow-auto">
                    <div className="mb-8">
                      <h2 className="text-xs font-bold uppercase">
                        Highlight parcels by owner&apos;s address
                      </h2>
                      {!!currentOwnerAddress && (
                        <div className="text-sm">
                          <div>Currently highlighting</div>
                          <div className="border bg-stone-100 p-0.5 font-mono">
                            {currentOwnerAddress}
                          </div>
                          <Button dense icon={BiX} onPress={handleOwnerClear}>
                            Clear
                          </Button>
                        </div>
                      )}
                      <OwnerSearch
                        onSelectionChangeAction={handleOwnerSelection}
                        selectedAddress={currentOwnerAddress}
                      />
                    </div>
                    <Label
                      htmlFor="mapContextLayerPicker"
                      className="text-xs font-bold uppercase"
                    >
                      Toggle extra map layers
                    </Label>
                    <div className="overflow-auto">
                      <ListBox
                        id="mapContextLayerPicker"
                        selectionMode="multiple"
                        onSelectionChange={handleMenuSelection}
                        selectedKeys={currentSelection}
                        disallowEmptySelection={false}
                        className="grid grid-cols-1 gap-1.5 p-1 pr-2"
                        shouldFocusOnHover
                      >
                        {availableLayers.map((l) => (
                          <ListBoxItem
                            className="selected:bg-green-100 group cursor-pointer rounded-sm border border-stone-800 p-1 ring-stone-800 focus:bg-stone-100 focus:ring-1"
                            key={l.slug}
                            id={l.slug}
                          >
                            <div className="flex items-center">
                              <BiCheck className="group-selected:block hidden size-5 text-green-900" />
                              <div className="group-selected:hidden block size-5" />
                              <div className="font-semibold">{l.title}</div>
                              {!!l.source.url && !l.warning && (
                                <InfoTooltip
                                  info={
                                    <A external href={l.source.url}>
                                      Source Dataset
                                    </A>
                                  }
                                />
                              )}
                              {!!l.warning && (
                                <div className="ml-0.5">
                                  <InfoTooltip
                                  warning
                                  info={
                                    <div className="overflow-auto">
                                      <Content className="text-sm" markdown={l.warning}></Content>
                                      <div>
                                        {!!l.source.url && (
                                          <A external href={l.source.url}>
                                            Source Dataset
                                          </A>
                                        )}
                                      </div>
                                    </div>
                                  }
                                />
                                </div>
                              )}
                            </div>
                            <div className="ml-5 text-xs italic">
                              {l.description}
                            </div>
                          </ListBoxItem>
                        ))}
                      </ListBox>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-end space-x-2">
                    <Button slot="close">Cancel</Button>
                    <Button onPress={handleSubmit(close)} variant="primary">
                      Update Map
                    </Button>
                  </div>
                </>
              )}
            </Dialog>
          </Modal>
        </ModalOverlay>
      </DialogTrigger>
    </div>
  );
}
