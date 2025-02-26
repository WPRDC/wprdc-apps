"use client";

import { Button, Map } from "@wprdc/ui";
import { useRouter } from "next/navigation";
import {
  Layer,
  LayerProps,
  MapGeoJSONFeature,
  MapRef,
  Source,
  SourceProps,
} from "react-map-gl/maplibre";
import { OverlayTriggerStateContext } from "react-aria-components";
import { BiX } from "react-icons/bi";
import { useContext, useRef, useState } from "react";
import { ViewState } from "react-map-gl/mapbox-legacy";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

export interface NavMapProps {
  projectID?: string;
  parcelIDs?: string[];
  mapID?: string;
  center?: number[];
  sources?: SourceProps[];
  layers?: LayerProps[];
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function MapView({
  projectID,
  center = [],
  parcelIDs = [],
  mapID = "navMap",
}: NavMapProps): React.ReactElement {
  const mapRef = useRef<MapRef>(null);

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

  const [longitude, latitude] = center;

  return (
    <Map
      id={mapID}
      initialViewState={{ zoom: 15, latitude, longitude }}
      mapTilerAPIKey={API_KEY}
      maxZoom={19}
      minZoom={9}
      onLoad={handleMapLoad}
      ref={mapRef}
      hoverPopup={null}
      scrollZoom={false}
      interactiveLayerIDs={["all-public-housing-projects/marker"]}
    >
      {/* Parcels */}
      <Source
        type="vector"
        id="parcels"
        url="https://data.wprdc.org/tiles/table.parcel_index.geom"
        minzoom={12}
      >
        <Layer
          id="parcels/fill"
          key={`${projectID}-fill`}
          type="fill"
          minzoom={12}
          source-layer="table.parcel_index.geom"
          paint={{
            "fill-opacity": 0.7,
            "fill-color": "#14b8a6",
          }}
          filter={["in", ["get", "parcel_id"], ["literal", parcelIDs]]}
        />
        <Layer
          id="parcels/line"
          key={`${projectID}-line`}
          type="line"
          minzoom={12}
          source-layer="table.parcel_index.geom"
          paint={{
            "line-opacity": 0.9,
            "line-color": "#042f2e",
          }}
          filter={["in", ["get", "parcel_id"], ["literal", parcelIDs]]}
        />
      </Source>
    </Map>
  ) as React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
}
