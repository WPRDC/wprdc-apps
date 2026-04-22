import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { prt } from "@/data/publishers.ts";

export const transitRoutes: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "transit-routes",
  title: "Public Transit Routes",
  description: "Public Transit Routes",

  source: {
    slug: "transit-routes",
    title: "WPRDC - Port Authority of Allegheny County Transit Routes",
    url: "https://data.wprdc.org/dataset/prt-current-transit-routes",
    resourceID: "4c3bf8b1-1bcd-42d6-bc7b-4c45be7da085",
    publisher: prt,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.4c3bf8b1-1bcd-42d6-bc7b-4c45be7da085._geom",
    sourceLayer: "table.4c3bf8b1-1bcd-42d6-bc7b-4c45be7da085._geom",
  },

  extent: {
    label: "Allegheny County",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Line,
    strokeColor: { mode: "fixed", style: "#9999FF" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
