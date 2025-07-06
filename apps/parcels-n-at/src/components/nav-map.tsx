"use client";

import {
  Button,
  ListBox,
  ListBoxItem,
  Map,
  parcelLayer,
  Popover,
} from "@wprdc/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useRef } from "react";
import {
  Layer,
  MapGeoJSONFeature,
  MapRef,
  Source,
} from "react-map-gl/maplibre";
import { ParcelSearch } from "@/components/parcel-search";
import { LayerConfig } from "@wprdc/types";
import { MenuTrigger, OverlayTriggerStateContext } from "react-aria-components";
import { BiCheck, BiMapAlt, BiX } from "react-icons/bi";
import { GeocodeResponse } from "@wprdc/api";

import { Selection } from "react-stately";
import { OwnerSearch } from "@/components/owner-search.tsx";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY ?? "missing";

export interface NavMapProps {
  selectedParcel?: string;
  layers?: LayerConfig[];
  ownerAddress?: string;
  showVacant?: boolean;
  showOwnerOccupied?: boolean;
  classes?: string;
  isModal?: boolean;
  mapID?: string;
  bbox?: GeocodeResponse["bbox"];
  zoomPan?: boolean;
  availableLayers?: LayerConfig[];
  selectedLayers?: string | string[];
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function NavMap({
  selectedParcel,
  ownerAddress,
  availableLayers = [],
  selectedLayers = [],
  layers = [],
  isModal,
  bbox,
  zoomPan,
  mapID = "navMap",
}: NavMapProps): React.ReactElement {
  const mapRef = useRef<MapRef>(null);
  const modalState = React.useContext(OverlayTriggerStateContext)!;

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const layerSelection = useMemo(() => {
    if (typeof selectedLayers === "string") {
      return new Set([selectedLayers]);
    }
    return new Set(selectedLayers ?? []);
  }, [selectedLayers]);

  useEffect(() => {
    if (zoomPan && bbox && mapRef.current) {
      mapRef.current.fitBounds(bbox, { padding: 30 });
    }
  }, [bbox]);

  async function handleMapLoad() {
    if (mapRef.current) {
      const map = mapRef.current.getMap();

      const image = await map.loadImage(
        `${BASE_PATH}/patterns/Solid256stripeDiagonal1_4_black.png`,
      );

      if (!map.hasImage("stripe") && !!image) {
        map.addImage("stripe", image.data, {});
      }
    }
  }

  function handleOwnerClear() {
    const params = new URLSearchParams(searchParams);
    params.delete("ownerAddr");
    router.push(`${pathName}?${params.toString()}`);
  }

  function handleMenuSelection(selection: Selection) {
    function nav(slugs: string[]) {
      const params = new URLSearchParams(searchParams);
      params.delete("selectedLayers");
      slugs.forEach((slug) => {
        params.append("selectedLayers", slug);
      });
      router.replace(`${pathName}?${params.toString()}`);
    }

    if (selection === "all") {
      nav(availableLayers?.map((l) => l.slug));
    } else {
      nav(Array.from(selection) as string[]);
    }
  }

  const contextLayers = useMemo(() => {
    if (!layerSelection.size) {
      return [];
    }
    return availableLayers.filter((l) => layerSelection.has(l.slug));
  }, [availableLayers, layerSelection]);

  return (
    <Map
      id={mapID}
      initialViewState={{ zoom: 15.5 }}
      layers={[...contextLayers, parcelLayer, ...layers]}
      mapTilerAPIKey={API_KEY}
      maxZoom={19}
      minZoom={11}
      onLoad={handleMapLoad}
      onNavigate={(feature: MapGeoJSONFeature) => {
        if (modalState) modalState.close();
        const params = new URLSearchParams(searchParams);
        params.set("parcel", feature.properties.parcel_id as string);

        router.push(`/explore?${params.toString()}`);
      }}
      ref={mapRef}
      selectedIDs={{
        [parcelLayer.slug]: [selectedParcel ?? ""],
      }}
      legendExtras={
        !!ownerAddress ? (
          <div>
            <h3 className="mb-0.5 font-sans font-bold">Owner Address</h3>
            <div className="flex items-center space-x-1">
              <div className="size-3 rounded border border-black bg-[#14b8a6]"></div>
              <div>{ownerAddress}</div>
            </div>
          </div>
        ) : undefined
      }
    >
      {/* Mobile close button */}
      <div className="absolute bottom-12 right-3 z-50 block lg:hidden">
        <Button
          className="border-2 p-1 shadow-xl"
          variant="danger"
          onPress={() => modalState.close()}
        >
          <BiX className="size-6" />
        </Button>
      </div>

      {/* Layer menu */}
      {!!availableLayers && (
        <div className="absolute right-12 top-12">
          <MenuTrigger>
            <Button icon={BiMapAlt}>Select Layers</Button>

            <Popover className="rounded-sm border border-black bg-white p-2">
              <article>
                <h1 className="mb-4">Layer Options</h1>

                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase">
                    Highlight parcels by owner
                  </h2>
                  {!!ownerAddress && (
                    <div className="text-sm">
                      <div>Currently highlighting</div>
                      <div className="border bg-stone-100 p-0.5 font-mono">
                        {ownerAddress}
                      </div>
                      <Button dense icon={BiX} onPress={handleOwnerClear}>
                        Clear
                      </Button>
                    </div>
                  )}
                  <OwnerSearch />
                </div>

                <div>
                  <h2 className="text-xs font-bold uppercase">
                    Toggle extra map layers
                  </h2>
                  <ListBox
                    selectionMode="multiple"
                    onSelectionChange={handleMenuSelection}
                    selectedKeys={layerSelection}
                    disallowEmptySelection={false}
                  >
                    {availableLayers.map((l) => (
                      <ListBoxItem
                        className="group-selected:font-bold group border-t first:border-t-0"
                        key={l.slug}
                        id={l.slug}
                      >
                        <div className="flex items-center hover:cursor-pointer hover:bg-gray-100">
                          <BiCheck className="group-selected:block hidden size-5 text-green-600" />
                          <div className="group-selected:hidden block size-5" />
                          <div>{l.title}</div>
                        </div>
                      </ListBoxItem>
                    ))}
                  </ListBox>
                </div>
              </article>
            </Popover>
          </MenuTrigger>
        </div>
      )}
      <div className="absolute max-lg:hidden top-4 left-4">
        <ParcelSearch />
      </div>

      <Source
        type="vector"
        id="vacant"
        url="https://data.wprdc.org/tiles/table.parcel_index.geom"
        minzoom={13}
      >
        {/* Owner address*/}
        <Layer
          id="ownerAddress/fill"
          key={`${ownerAddress}-fill`}
          type="fill"
          minzoom={13}
          source-layer="table.parcel_index.geom"
          paint={{
            "fill-opacity": [
              "match",
              ["get", "owner_address"],
              ownerAddress ?? "----",
              0.6,
              0,
            ],
            "fill-color": "#14b8a6",
          }}
        />
        <Layer
          id="ownerAddress/line"
          key={`${ownerAddress}-line`}
          type="line"
          minzoom={13}
          source-layer="table.parcel_index.geom"
          paint={{
            "line-opacity": [
              "match",
              ["get", "owner_address"],
              ownerAddress ?? "----",
              0.8,
              0,
            ],
            "line-color": "#042f2e",
          }}
        />
      </Source>
    </Map>
  );
}
