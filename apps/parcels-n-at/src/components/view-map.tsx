"use client";

import { Map } from "@wprdc/ui";
import { Layer, Source } from "react-map-gl/maplibre";
import { DataDrivenPropertyValueSpecification } from "maplibre-gl";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY ?? "missing";

const items = [
  { id: "upitt", color: "#003594", label: "Pitt" },
  { id: "city", color: "#FFB81C", label: "City of Pittsburgh" },
  { id: "ura", color: "green", label: "URA" },
  { id: "hacp", color: "pink", label: "HACP" },
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
      <div className="absolute bottom-2.5 left-3.5 rounded border-2 border-black bg-white p-2">
        <h1 className="mb-2 text-lg font-semibold leading-none">Legend</h1>
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.id} className="flex gap-1.5">
              <div
                className="size-4 rounded-sm border border-black"
                style={{ background: item.color }}
              ></div>
              <div>{item.label}</div>
            </li>
          ))}
        </ul>
      </div>

      <Source
        type="vector"
        url="https://data.wprdc.org/tiles/table.large_property_owners_map.geom"
      >
        <Layer
          type="fill"
          paint={{
            "fill-color": colorsExpression,
          }}
          source-layer="table.large_property_owners_map.geom"
          minzoom={12}
        />
        <Layer
          type="line"
          source-layer="table.large_property_owners_map.geom"
          paint={{
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              12,
              1,
              13,
              1,
              14,
              2,
              18,
              4,
            ],
          }}
          minzoom={12}
        />
      </Source>
    </Map>
  );
}

//upitt
// city
// ura
// upmc
// hacp
// cmu
// highmark
[
  "#66c2a5",
  "#fc8d62",
  "#8da0cb",
  "#e78ac3",
  "#a6d854",
  "#ffd92f",
  "#e5c494",
  "#b3b3b3",
];
