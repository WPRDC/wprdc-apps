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
import { useContext, useRef } from "react";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

export interface NavMapProps {
  projectID?: string;
  parcelIDs?: string[];
  mapID?: string;

  sources?: SourceProps[];
  layers?: LayerProps[];
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

  const sources: SourceProps[] = [
    {
      id: "all-public-housing-projects",
      type: "vector",
      url: "http://127.0.0.1:3001/maps.all_public_housing_projects.json",
    },
  ];

  const layers: LayerProps[] = [
    {
      id: "all-public-housing-projects/marker",
      source: "all-public-housing-projects",
      "source-layer": "maps.all_public_housing_projects",
      type: "circle",
      paint: {
        "circle-opacity": 0.8,
        "circle-stroke-width": 1,
        "circle-radius": [
          "step",
          ["to-number", ["get", "max_units"]],
          5,
          50,
          5,
          100,
          7.5,
          250,
          12.5,
          500,
          25,
        ],
        "circle-color": [
          "match",
          ["to-string", ["get", "funding_category"]],
          "HUD Multifamily",
          "#7F3C8D",
          "LIHTC",
          "#11A579",
          "Public Housing",
          "#3969AC",
          "HUD Multifamily|LIHTC",
          "#F2B701",
          "LIHTC|Public Housing",
          "#F2B701",
          "HUD Multifamily|LIHTC|Public Housing",
          "#F2B701",
          "gray",
        ],
        "circle-stroke-color": [
          "match",
          ["to-string", ["get", "status"]],
          "Closed",
          "red",
          "black",
        ],
      },
    },
    {
      id: "all-public-housing-projects/text",
      source: "all-public-housing-projects",
      "source-layer": "maps.all_public_housing_projects",
      type: "symbol",
      layout: {
        "text-allow-overlap": true,
        "text-field": ["to-string", ["get", "hud_property_name"]],
        "text-offset": [0, 1],
        "text-anchor": "top",
        "text-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14,
          0,
          14.1,
          12,
        ],
      },
      paint: {
        "text-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          14,
          0,
          16,
          1,
          22,
          1,
        ],
      },
    },
  ];

  return (
    <Map
      id={mapID}
      initialViewState={{ zoom: 10 }}
      mapTilerAPIKey={API_KEY}
      maxZoom={19}
      minZoom={9}
      onLoad={handleMapLoad}
      onNavigate={(feature: MapGeoJSONFeature) => {
        if (modalState) modalState.close();
        router.push(`/explore/?id=${feature.properties.id as string}`);
      }}
      ref={mapRef}
      hoverPopup={null}
      interactiveLayerIDs={["all-public-housing-projects/marker"]}
    >
      <div className="absolute bottom-12 right-3 z-50 block lg:hidden">
        <Button
          className="border-2 p-1 shadow-xl"
          variant="danger"
          onPress={() => {
            if (modalState) modalState.close();
          }}
        >
          <BiX className="size-6" />
        </Button>
      </div>

      {sources.map((source) => (
        <Source {...source} key={source.id} />
      ))}
      {layers.map((layer) => (
        <Layer {...layer} key={layer.id} />
      ))}

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
          filter={["in", ["get", "parcel_id"], ["literal", parcelIDs]]}
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
          filter={["in", ["get", "parcel_id"], ["literal", parcelIDs]]}
        />
      </Source>
    </Map>
  ) as React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
}
