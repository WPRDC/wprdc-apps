"use client";

import { useMap } from "react-map-gl/maplibre";
import { CoordinatePair } from "@wprdc/types";
import {
  Button,
  Dialog,
  Modal,
  ModalOverlay,
  ToastProvider,
  ToastState,
} from "@wprdc/ui";
import { TbBorderCorners, TbCopy, TbShare2 } from "react-icons/tb";
import { DialogTrigger } from "react-aria-components";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export interface MapControlsProps {
  parcelID: string;
  bbox: [CoordinatePair, CoordinatePair];
}

export function MapControls({ parcelID, bbox }: MapControlsProps) {
  const [shareURL, setShareURL] = useState<string>("");
  const [embedCode, setEmbedCode] = useState<string>("");

  const { navMap, popupMap } = useMap();
  const pathname = usePathname();

  function handleZoomPan() {
    if (navMap) navMap.fitBounds(bbox);
    if (popupMap) popupMap.fitBounds(bbox);
  }

  useEffect(() => {
    const host = window.location.host;
    const scheme = window.location.protocol === "https:" ? "https" : "http";
    const url = `${scheme}://${host}${pathname}?parcel=${parcelID}`;
    setShareURL(url);
    setEmbedCode(
      `<iframe width="800" height="600" src="${url}&zoompan=1"></iframe>`,
    );
  }, []);

  const handleCopy = (url: string, toastState: ToastState<ReactNode>) => () => {
    if (typeof window !== "undefined") navigator.clipboard.writeText(url);
    toastState.add("Copied!", { timeout: 5000 });
  };

  return (
    <div className="flex space-x-2">
      <div>
        <Button icon={TbBorderCorners} onPress={handleZoomPan}>
          Center on Map
        </Button>
      </div>
      <div>
        <DialogTrigger>
          <Button icon={TbShare2}>Share</Button>
          <ModalOverlay isDismissable>
            <Modal isDismissable>
              <Dialog>
                <ToastProvider>
                  {(state) => (
                    <div className="flex max-w-screen-sm flex-col items-stretch space-y-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-xl font-bold">Link</p>
                          <Button
                            className="shadow-none hover:shadow-sm"
                            onPress={handleCopy(shareURL, state)}
                            aria-label="Copy link to clipboard"
                            icon={TbCopy}
                          ></Button>
                        </div>
                        <div className="bg-primary/20 mt-2 border border-stone-700 px-2 py-1 font-mono text-gray-700">
                          {shareURL}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-xl font-bold">Embed</p>
                          <Button
                            onPress={handleCopy(embedCode, state)}
                            className="shadow-none hover:shadow-sm"
                            aria-label="Copy embed code to clipboard"
                            icon={TbCopy}
                          ></Button>
                        </div>
                        <div className="bg-primary/20 mt-2 border border-stone-700 px-2 py-1 font-mono text-gray-700">
                          {embedCode}
                        </div>
                      </div>
                    </div>
                  )}
                </ToastProvider>
              </Dialog>
            </Modal>
          </ModalOverlay>
        </DialogTrigger>
      </div>
    </div>
  );
}
