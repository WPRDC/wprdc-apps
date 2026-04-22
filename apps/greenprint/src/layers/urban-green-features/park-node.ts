import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { alleghenyCounty } from "@/data/publishers.ts";

export const parkNode: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "park-node",
  title: "Park Nodes",
  description: "Park nodes",

  source: {
    slug: "park-node",
    title: "WPRDC - Allegheny County Greenways",
    url: "https://data.wprdc.org/dataset/allegheny-county-greenways",
    resourceID: "e6a4f3f0-6308-440a-bddd-9b9612b6cc4e",
    publisher: alleghenyCounty,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.0335f47a-ed05-4664-8ba3-7ddffd6828bc._geom",
    sourceLayer: "table.0335f47a-ed05-4664-8ba3-7ddffd6828bc._geom",
  },

  extent: { label: "Allegheny County", bbox: [0, 0, 0, 0] },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: { mode: "fixed", style: "#41AB5D" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },

  renderOptions: {
    filter: ["==", "Type", "Park Node"],
  },
};
