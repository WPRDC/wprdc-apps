"use client";

import { useMap } from "react-map-gl/maplibre";
import { CoordinatePair } from "@wprdc/types";
import {
  Button,
  Dialog,
  Menu,
  MenuItem,
  Modal,
  ModalOverlay,
  Popover,
  ToastProvider,
  ToastState,
} from "@wprdc/ui";
import {
  TbBorderCorners,
  TbChevronsDown,
  TbCopy,
  TbExternalLink,
  TbShare2,
} from "react-icons/tb";
import { DialogTrigger, MenuTrigger } from "react-aria-components";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export interface MapControlsProps {
  parcelID: string;
  address: string;
  centroid?: CoordinatePair;
  bbox?: [CoordinatePair, CoordinatePair];
}

export function MapControls({
  parcelID,
  centroid,
  bbox,
  address,
}: MapControlsProps) {
  const [shareURL, setShareURL] = useState<string>("");
  const [embedCode, setEmbedCode] = useState<string>("");

  const router = useRouter();
  const { navMap, popupMap } = useMap();
  const pathname = usePathname();

  const [lng, lat] = centroid ?? [undefined, undefined];

  const appleMapsLink = `https://maps.apple.com/place?address=${address}`;
  const googleMapsLink = `https://www.google.com/maps/?q=${address}`;
  const streetViewLink = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`;
  const acRealEstatePortalLink = `https://realestate.alleghenycounty.us/GeneralInfo?ID=${parcelID}`;

  function handleZoomPan() {
    if (bbox) {
      if (navMap) navMap.fitBounds(bbox, { padding: 30 });
      if (popupMap) popupMap.fitBounds(bbox, { padding: 10 });
    }
  }

  useEffect(() => {
    const host = window.location.host;
    const scheme = window.location.protocol === "https:" ? "https" : "http";
    const url = `${scheme}://${host}${pathname}?parcel=${parcelID}&zoomPan=1`;
    setShareURL(url);
    setEmbedCode(
      `<iframe width="800" height="600" src="${url}&zoomPan=1"></iframe>`,
    );
  }, []);

  const handleCopy = (url: string, toastState: ToastState<ReactNode>) => () => {
    if (typeof window !== "undefined") navigator.clipboard.writeText(url);
    toastState.add("Copied!", { timeout: 5000 });
  };

  return (
    <div>
      <div className="flex scroll-mt-28 space-x-2" id="menu">
        {/* Map Menu */}
        <div>
          <Button
            icon={TbBorderCorners}
            onPress={handleZoomPan}
            variant="primary"
          >
            Center on Map
          </Button>
        </div>

        {/* Share menu*/}
        <div>
          <DialogTrigger>
            <Button icon={TbShare2}>Share&hellip;</Button>
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


        {/* Links */}
        <div>
          <MenuTrigger>
            <Button icon={TbExternalLink}>Other Sites&hellip;</Button>
            <Popover>
              <Menu className="flex flex-col border border-black">
                <MenuItem href={acRealEstatePortalLink} target="_blank" className="flex gap-0.5 underline items-center">
                  <div>County Real Estate Portal</div> <TbExternalLink />
                </MenuItem>
                <MenuItem href={googleMapsLink} target="_blank" className="flex gap-0.5 underline items-center">
                  <div>Google Maps</div> <TbExternalLink />
                </MenuItem>
                <MenuItem href={appleMapsLink} target="_blank" className="flex gap-0.5 underline items-center">
                  <div>Apple Maps </div>
                  <TbExternalLink />
                </MenuItem>
                <MenuItem href={streetViewLink} target="_blank" className="flex gap-0.5 underline items-center">
                  <div>Google Street View</div> <TbExternalLink />
                </MenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
        </div>


        {/* Nav Menu */}
        <nav id="dashboard-navigation">
          <MenuTrigger>
            <Button icon={TbChevronsDown}>Jump To&hellip;</Button>
            <Popover>
              <Menu
                onAction={(key) => router.push(`#${key}`)}
                className="border border-black"
              >
                <MenuItem id="owner">Owner</MenuItem>
                <MenuItem id="assessed-value">Assessed Value</MenuItem>
                <MenuItem id="dwelling">Dwelling Characteristics</MenuItem>
                <MenuItem id="condition">Condition</MenuItem>
                <MenuItem id="tax-context">Tax Details</MenuItem>
                <MenuItem id="images">Images</MenuItem>
                <MenuItem id="sales">Sales</MenuItem>
                <MenuItem id="assessment-appeals">Assessment Appeals</MenuItem>
                <MenuItem id="pli-permits">PLI Permits</MenuItem>
                <MenuItem id="code-violations">Code Violations</MenuItem>
                <MenuItem id="condemned-properties-section">
                  Condemned Status
                </MenuItem>
                <MenuItem id="tax-liens">Tax Liens</MenuItem>
                <MenuItem id="foreclosure">Foreclosure</MenuItem>
                <MenuItem id="conservatorship">Conservatorship</MenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
        </nav>
      </div>
    </div>
  );
}
