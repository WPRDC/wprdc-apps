"use client";

import { Button, Map, parcelLayer } from "@wprdc/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useRef } from "react";
import {
  Layer,
  MapGeoJSONFeature,
  MapRef,
  Source,
} from "react-map-gl/maplibre";
import { LayerConfig } from "@wprdc/types";
import { OverlayTriggerStateContext } from "react-aria-components";
import { BiX } from "react-icons/bi";
import { GeocodeResponse } from "@wprdc/api";
import { LAYER_QUERY_KEY } from "@/util.ts";
import { flatLayers } from "@/layers";

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
  ownerAddress,
  bbox,
  zoomPan,
  mapID = "navMap",
}: NavMapProps): React.ReactElement {
  const mapRef = useRef<MapRef>(null);
  const modalState = React.useContext(OverlayTriggerStateContext)!;

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const selectedParcel = searchParams.get("parcel");

  const selectedLayers = searchParams.get(LAYER_QUERY_KEY);

  console.log(selectedParcel);

  const layers = useMemo(() => {
    const keys = new Set(selectedLayers?.split(",").filter(Boolean) ?? []);
    return flatLayers.filter((l) => keys.has(l.slug));
  }, [selectedLayers]);

  // fit bounds on props change
  useEffect(() => {
    if (zoomPan && bbox && mapRef.current) {
      const map = mapRef.current.getMap();
      map.fitBounds(bbox, { padding: 30 });
    }
  }, [bbox, zoomPan, selectedParcel]);

  async function handleMapLoad() {
    if (mapRef.current) {
      const map = mapRef.current.getMap();

      const image = await map.loadImage(
        `${BASE_PATH}/patterns/Solid256stripeDiagonal1_4_black.png`,
      );

      if (!map.hasImage("stripe") && !!image) {
        map.addImage("stripe", image.data, {});
      }
      // fit bounds on map load
      if (zoomPan && bbox) {
        map.fitBounds(bbox, { padding: 30 });
      }
    }
  }

  function handleOwnerClear() {
    const params = new URLSearchParams(searchParams);
    params.delete("ownerAddr");
    router.push(`${pathName}?${params.toString()}`);
  }

  return (
    <Map
      id={mapID}
      initialViewState={{ zoom: 15.5 }}
      layers={[...layers]}
      mapTilerAPIKey={API_KEY}
      maxZoom={19}
      minZoom={9}
      onLoad={handleMapLoad}
      onNavigate={(feature: MapGeoJSONFeature) => {
        if (modalState) modalState.close();
        const params = new URLSearchParams(searchParams);
        params.delete("zoomPan");
        params.set("parcel", feature.properties.parcel_id as string);

        router.push(`?${params.toString()}`);
      }}
      ref={mapRef}
      selectedIDs={{
        [parcelLayer.slug]: [selectedParcel ?? ""],
      }}
      legendExtras={
        ownerAddress ? (
          <div>
            <h3 className="mb-0.5 font-sans font-bold">Owner Address</h3>
            <div className="flex items-center space-x-1">
              <div className="size-3 rounded border border-black bg-[#14b8a6]"></div>
              <div>{ownerAddress}</div>
            </div>
            <Button dense icon={BiX} onPress={handleOwnerClear}>
              Clear
            </Button>
          </div>
        ) : undefined
      }
    >
      {/* Mobile close button */}
      <div className="absolute right-4 bottom-12 z-50 block lg:hidden">
        <Button
          className="border-2 p-1 shadow-xl"
          variant="danger"
          onPress={() => modalState.close()}
        >
          <BiX className="size-6" />
        </Button>
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
