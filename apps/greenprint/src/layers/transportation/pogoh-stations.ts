import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { pogoh } from "@/data/publishers.ts";

export const pogohStations: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "pogoh-stations",
  title: "POGOH Stations",
  description: "POGOH Stations",

  source: {
    slug: "pogoh-stations",
    title: "WPRDC - Healthy Ride Stations",
    url: "https://data.wprdc.org/dataset/healthyride-stations",
    resourceID: "722bace4-98a3-456b-9029-7d64090e5bd6",
    publisher: pogoh,
  },
  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.722bace4-98a3-456b-9029-7d64090e5bd6._geom",
    sourceLayer: "table.722bace4-98a3-456b-9029-7d64090e5bd6._geom",
  },
  extent: {
    label: "Pittsburgh",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Point,
    fillColor: { mode: "fixed", style: "#00ABE0" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
