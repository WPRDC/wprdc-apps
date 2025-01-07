"use client";
import { Map as Map_ } from "@wprdc/ui";

import { Layer, Source } from "react-map-gl/maplibre";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

const TILE_HOST: string = "https://data.wprdc.org/tiles/";

export function Map({ name, layer }: { name: string; layer: string }) {
  return (
    <Map_ mapTilerAPIKey={API_KEY}>
      <Source type="vector" url={`${TILE_HOST}/${name}`}>
        <Layer
          type="fill"
          source-layer={layer}
          layout={{}}
          paint={{
            "fill-color": "blue",
          }}
        />
      </Source>
    </Map_>
  );
}
