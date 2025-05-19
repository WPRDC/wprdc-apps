"use client";

import {
  A,
  Button,
  Map,
  Menu,
  MenuItem,
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
import { FillPaintSpec, LayerConfig } from "@wprdc/types";
import { TbSquareLetterAFilled, TbSquareLetterBFilled } from "react-icons/tb";
import { MenuTrigger, OverlayTriggerStateContext } from "react-aria-components";
import { BiCheck, BiMapAlt, BiX } from "react-icons/bi";
import { GeocodeResponse } from "@wprdc/api";

import { Selection } from "react-stately";

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
  showOwnerOccupied,
  showVacant,
  availableLayers = [],
  selectedLayers = [],
  layers = [],
  classes,
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

  const classPaint: FillPaintSpec = useMemo(() => {
    if (classes === "sim-city") {
      return {
        "fill-opacity": ["case", !!classes, 0.5, 0],

        "fill-color": [
          "match",
          ["get", "class"],

          "RESIDENTIAL",
          "#14532d",

          "COMMERCIAL",
          "#1e40af",

          "INDUSTRIAL",
          "#92400e",

          "AGRICULTURAL",
          "#eab308",

          "GOVERNMENT",
          "#a21caf",

          "UTILITIES",
          "#5b21b6",

          "OTHER",
          "#44403c",

          "#44403c",
        ],
      };
    }
    return {
      "fill-opacity": ["case", !!classes, 0.5, 0],

      "fill-color": [
        "match",
        ["get", "class"],

        "RESIDENTIAL",
        "#FFFF00",

        "COMMERCIAL",
        "#FF0000",

        "INDUSTRIAL",
        "#A020F0",

        "AGRICULTURAL",
        "#228B22",

        "GOVERNMENT",
        "#0000FF",

        "UTILITIES",
        "#575757",

        "OTHER",
        "#BEBEBE",

        "#BEBEBE",
      ],
    };
  }, [classes]);

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
        router.push(
          `/explore?parcel=${feature.properties.parcel_id as string}`,
        );
      }}
      ref={mapRef}
      selectedIDs={{
        [parcelLayer.slug]: [selectedParcel ?? ""],
      }}
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

      {/* Mobile controls */}
      <div className="absolute left-2.5 top-2 flex-col space-y-2">
        {!isModal && (
          <div className="mx-auto w-fit">
            <ParcelSearch />
          </div>
        )}
        <A
          variant="button"
          className="flex space-x-1"
          href={`/explore?parcel=${selectedParcel}&classes=sim-city`}
        >
          <div>Show Use Classes</div>
          <TbSquareLetterAFilled />
        </A>
        <A
          variant="button"
          className="flex space-x-1"
          href={`/explore?parcel=${selectedParcel}&classes=lbcs`}
        >
          <div>Show Use Classes</div>
          <TbSquareLetterBFilled />
        </A>
      </div>

      {/* Layer menu */}
      {!!availableLayers && (
        <div className="absolute right-12 top-12">
          <MenuTrigger>
            <Button icon={BiMapAlt}>Select Layers</Button>
            <Popover>
              <Menu
                selectionMode="multiple"
                onSelectionChange={handleMenuSelection}
                selectedKeys={layerSelection}
                disallowEmptySelection={false}
              >
                {availableLayers.map((l) => (
                  <MenuItem
                    className="group-selected:font-bold group flex items-center border-t first:border-t-0"
                    key={l.slug}
                    id={l.slug}
                  >
                    <BiCheck  className="group-selected:block hidden size-5"/>
                    <div className="size-5 group-selected:hidden block"/>
                    <div>{l.title}</div>
                  </MenuItem>
                ))}
              </Menu>
            </Popover>
          </MenuTrigger>
        </div>
      )}

      <Source
        type="vector"
        id="vacant"
        url="https://data.wprdc.org/tiles/table.parcel_index.geom"
        minzoom={13}
      >
        {/* Class */}
        <Layer
          id="class/fill"
          type="fill"
          minzoom={13}
          source-layer="table.parcel_index.geom"
          paint={classPaint}
        />

        <Layer
          id="class/line"
          type="line"
          minzoom={13}
          source-layer="table.parcel_index.geom"
          paint={{
            "line-opacity": [
              "match",
              ["get", "class"],
              ownerAddress ?? "----",
              0.8,
              0,
            ],
            "line-color": "#042f2e",
          }}
        />

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

      {!!ownerAddress || !!classes ? (
        <section className="absolute bottom-3 left-3 flex flex-col space-y-2 rounded border-2 border-black bg-white p-2 font-mono text-xs leading-none">
          <h2 className="font-sans text-xs font-black uppercase text-stone-500">
            Legend
          </h2>
          {!!ownerAddress && (
            <div>
              <h3 className="mb-0.5 font-sans font-bold">Owner Address</h3>
              <div className="flex items-center space-x-1">
                <div className="size-3 rounded border border-black bg-[#14b8a6]"></div>
                <div>{ownerAddress}</div>
              </div>
            </div>
          )}
          {!!classes && (
            <div>
              <h3 className="mb-0.5 font-sans font-bold">Use Class</h3>
              {classes === "sim-city" ? (
                <ul className="flex flex-col space-y-0.5">
                  <li className="flex items-center space-x-1">
                    <div className="size-3 rounded border border-black bg-[#14532d]"></div>
                    <div>RESIDENTIAL</div>
                  </li>
                  <li className="flex items-center space-x-1">
                    <div className="size-3 rounded border border-black bg-[#1e40af]"></div>
                    <div>COMMERCIAL</div>
                  </li>
                  <li className="flex items-center space-x-1">
                    <div className="size-3 rounded border border-black bg-[#92400e]"></div>
                    <div>INDUSTRIAL</div>
                  </li>
                  <li className="flex items-center space-x-1">
                    <div className="size-3 rounded border border-black bg-[#eab308]"></div>
                    <div>AGRICULTURAL</div>
                  </li>
                  <li className="flex items-center space-x-1">
                    <div className="size-3 rounded border border-black bg-[#a21caf]"></div>
                    <div>GOVERNMENT</div>
                  </li>
                  <li className="flex items-center space-x-1">
                    <div className="size-3 rounded border border-black bg-[#5b21b6]"></div>
                    <div>UTILITIES</div>
                  </li>
                  <li className="flex items-center space-x-1">
                    <div className="size-3 rounded border border-black bg-[#44403c]"></div>
                    <div>OTHER</div>
                  </li>
                </ul>
              ) : null}
              {!!classes && classes !== "sim-city" ? (
                <ul className="flex flex-col space-y-0.5">
                  <li className="flex items-center space-x-1">
                    <div className="size-3 rounded border border-black bg-[#FFFF00]"></div>
                    <div>RESIDENTIAL</div>
                  </li>
                  <li className="flex items-center space-x-1">
                    <div className="size-3 rounded border border-black bg-[#FF0000]"></div>
                    <div>COMMERCIAL</div>
                  </li>
                  <li className="flex items-center space-x-1">
                    <div className="size-3 rounded border border-black bg-[#A020F0]"></div>
                    <div>INDUSTRIAL</div>
                  </li>
                  <li className="flex items-center space-x-1">
                    <div className="size-3 rounded border border-black bg-[#228B22]"></div>
                    <div>AGRICULTURAL</div>
                  </li>
                  <li className="flex items-center space-x-1">
                    <div className="size-3 rounded border border-black bg-[#0000FF]"></div>
                    <div>GOVERNMENT</div>
                  </li>
                  <li className="flex items-center space-x-1">
                    <div className="size-3 rounded border border-black bg-[#575757]"></div>
                    <div>UTILITIES</div>
                  </li>
                  <li className="flex items-center space-x-1">
                    <div className="size-3 rounded border border-black bg-[#BEBEBE]"></div>
                    <div>OTHER</div>
                  </li>
                </ul>
              ) : null}
            </div>
          )}
        </section>
      ) : null}
    </Map>
  );
}
