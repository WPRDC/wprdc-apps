"use client";

import { Map } from "@wprdc/ui";
import { Layer, Source } from "react-map-gl/maplibre";
import {
  DataDrivenPropertyValueSpecification,
  ExpressionInputType,
} from "maplibre-gl";
import { ListBox, ListBoxItem, Selection } from "react-aria-components";
import { useMemo, useState } from "react";

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
    (finalColors, item) => [
      ...finalColors,
      item.id,
      item.color,
      `${item.id}\r`,
      item.color,
    ],
    [] as string[],
  ),
  "#000",
];

export function ViewMap() {
  const [selectedLayers, setSelectedLayers] = useState<Set<string>>(
    new Set(items.map((i) => i.id)),
  );

  function handleSelectionChange(selection: Selection) {
    if (selection === "all") {
      setSelectedLayers(new Set(items.map((i) => i.id)));
    } else {
      setSelectedLayers(selection as Set<string>);
    }
  }

  const opacityExpression: DataDrivenPropertyValueSpecification<number> =
    useMemo(() => {
      const colorExpressionPart = items.reduce(
        (acc, cur) => [
          ...acc,
          cur.id,
          selectedLayers.has(cur.id) ? 0.7 : 0,
          `${cur.id}\r`,
          selectedLayers.has(cur.id) ? 0.7 : 0,
        ],
        [] as ExpressionInputType[],
      );

      // @ts-ignore
      return [
        "match",
        ["get", "owner"],
        ...colorExpressionPart,
        1,
      ] as DataDrivenPropertyValueSpecification<number>;
    }, [selectedLayers]);

  return (
    <Map
      mapTilerAPIKey={API_KEY}
      style={{ position: "relative" }}
      initialViewState={{ zoom: 12.5 }}
      onHover={console.log}
    >
      <div className="absolute left-3.5 top-2.5 max-w-96 rounded border-2 border-black border-opacity-60 bg-white/60 p-2 backdrop-blur-sm">
        <h1 className="mb-4 text-3xl font-bold leading-none">
          Large Parcel Owners in Allegheny County
        </h1>
        <p className="italic">Click to toggle layers</p>
        <ListBox
          className="flex flex-col gap-2"
          onSelectionChange={handleSelectionChange}
          selectedKeys={selectedLayers}
          items={items}
          aria-labelledby="legend-title"
          selectionMode="multiple"
        >
          {(item) => (
            <ListBoxItem
              key={item.id}
              className="group flex cursor-pointer gap-1.5"
              textValue={item.label}
            >
              <div
                className="group-selected:opacity-80 size-4 rounded-sm border border-black opacity-10"
                style={{ background: item.color }}
              ></div>
              <div className="text-xs font-semibold">{item.label}</div>
            </ListBoxItem>
          )}
        </ListBox>
      </div>

      <Source
        type="vector"
        url="https://data.wprdc.org/tiles/table.large_property_owners_map.geom"
      >
        <Layer
          type="fill"
          id="owned-parcels/fill"
          paint={{
            "fill-color": colorsExpression,
            "fill-opacity": opacityExpression,
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
            "line-opacity": opacityExpression,
          }}
          minzoom={10}
        />
      </Source>
    </Map>
  );
}
