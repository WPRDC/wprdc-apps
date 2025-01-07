"use client";

import { Button, Map, parcelLayer } from "@wprdc/ui";
import { useRouter } from "next/navigation";
import {
  Layer,
  MapGeoJSONFeature,
  MapRef,
  Source,
} from "react-map-gl/maplibre";
import { OverlayTriggerStateContext } from "react-aria-components";
import { BiX } from "react-icons/bi";
import { useContext, useRef } from "react";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

export interface NavMapProps {
  projectID?: string;
  parcelIDs?: string[];
  mapID?: string;
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function NavMap({
  projectID,
  parcelIDs = [],
  mapID = "navMap",
}: NavMapProps): React.ReactElement {
  const mapRef = useRef<MapRef>(null);
  const modalState = useContext(OverlayTriggerStateContext);

  const router = useRouter();

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

  return (
    <Map
      id={mapID}
      initialViewState={{ zoom: 15.5 }}
      mapTilerAPIKey={API_KEY}
      maxZoom={19}
      minZoom={11}
      onLoad={handleMapLoad}
      onNavigate={(feature: MapGeoJSONFeature) => {
        if (modalState) modalState.close();
        router.push(`/explore/${feature.properties.project_id as string}`);
      }}
      ref={mapRef}
    >
      <div className="absolute bottom-12 right-3 z-50 block lg:hidden">
        <Button
          className="border-2 p-1 shadow-xl"
          variant="danger"
          onPress={() => modalState.close()}
        >
          <BiX className="size-6" />
        </Button>
      </div>

      {/* Parcels */}
      <Source
        type="vector"
        id="parcels"
        url="https://data.wprdc.org/tiles/table.parcel_index.geom"
        minzoom={13}
      >
        <Layer
          id="parcels/fill"
          key={`${projectID}-fill`}
          type="fill"
          minzoom={13}
          source-layer="table.parcel_index.geom"
          paint={{
            "fill-opacity": 0.7,
            "fill-color": "#14b8a6",
          }}
          filter={["in", ["get", "parcel_id"], parcelIDs]}
        />
        <Layer
          id="ownerAddress/line"
          key={`${projectID}-line`}
          type="line"
          minzoom={13}
          source-layer="table.parcel_index.geom"
          paint={{
            "line-opacity": 0.9,
            "line-color": "#042f2e",
          }}
          filter={["in", ["get", "parcel_id"], parcelIDs]}
        />
      </Source>
    </Map>
  );
}
