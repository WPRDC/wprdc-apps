import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { prt } from "@/data/publishers.ts";

export const transitStops: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "transit-stops",
  title: "Public Transit Stops",
  description: "Public Transit Stops",

  source: {
    slug: "transit-stops",
    title: "WPRDC - Port Authority of Allegheny County Transit Stops",
    url: "https://data.wprdc.org/dataset/prt-of-allegheny-county-transit-stops",
    resourceID: "d6e6ed6e-9220-4a0e-9796-e72d83ce8e7a",
    publisher: prt,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.d6e6ed6e-9220-4a0e-9796-e72d83ce8e7a._geom",
    sourceLayer: "table.d6e6ed6e-9220-4a0e-9796-e72d83ce8e7a._geom",
  },
  extent: {
    label: "Allegheny County",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Point,
    fillColor: { mode: "fixed", style: "#4C4C7F" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
