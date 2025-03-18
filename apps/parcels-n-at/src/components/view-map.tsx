"use client";

import { Map } from "@wprdc/ui";
import { Layer, Source } from "react-map-gl/maplibre";
import { DataDrivenPropertyValueSpecification } from "maplibre-gl";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY ?? "missing";

const items = [
  {
    id: "acha",
    color: "#a6761d",
    label: "ACHA",
  },
  { id: "city", color: "#FFB81C", label: "City of Pittsburgh" },
  { id: "ura", color: "green", label: "URA" },
  { id: "hacp", color: "pink", label: "HACP" },
  { id: "upitt", color: "#003594", label: "Pitt" },
  { id: "cmu", color: "#C41230", label: "CMU" },
  { id: "upmc", color: "rgb(99,11,77)", label: "UPMC" },
  { id: "highmark", color: "rgb(18,144,219)", label: "Highmark" },
];

// @ts-ignore
const colorsExpression: DataDrivenPropertyValueSpecification<string> = [
  "match",
  ["get", "owner"],
  ...items.reduce(
    (finalColors, item) => [...finalColors, item.id, item.color],
    [] as string[],
  ),
  "#000",
];

export function ViewMap() {
  return (
    <Map
      mapTilerAPIKey={API_KEY}
      style={{ position: "relative" }}
      initialViewState={{ zoom: 12.5 }}
    >
      <div className="absolute left-3.5 top-2.5 rounded border-2 border-black border-opacity-60 bg-white/60 p-2 backdrop-blur-sm">
        <h1 className="text-3xl font-bold leading-none">
          Large Parcel Owners in Allegheny County
        </h1>
      </div>
      <aside className="absolute bottom-2.5 left-3.5 rounded border-2 border-black bg-white/90 p-2 backdrop-blur-sm">
        <h1 className="mb-4 text-lg font-semibold leading-none">Legend</h1>
        <div className="mb-2 text-base font-semibold">Parcel Owner</div>
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.id} className="flex gap-1.5">
              <div
                className="size-4 rounded-sm border border-black opacity-80"
                style={{ background: item.color }}
              ></div>
              <div className="text-xs font-semibold">{item.label}</div>
            </li>
          ))}
        </ul>
      </aside>

      <Source
        type="vector"
        url="https://data.wprdc.org/tiles/table.large_property_owners_map.geom"
      >
        <Layer
          type="fill"
          paint={{
            "fill-color": colorsExpression,
            "fill-opacity": 0.7,
          }}
          source-layer="table.large_property_owners_map.geom"
          minzoom={10}
        />
        <Layer
          type="line"
          source-layer="table.large_property_owners_map.geom"
          paint={{
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              10,
              0,
              12,
              1,
              13,
              1,
              15,
              2,
              18,
              4,
            ],
          }}
          minzoom={10}
        />
      </Source>
    </Map>
  );
}
