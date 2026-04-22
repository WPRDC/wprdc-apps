import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { alleghenyCounty } from "@/data/publishers.ts";

export const agriculturalEasement: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "agricultural-easement",
  title: "Agricultural Easements",
  description: "Areas designated for agricultural easement.",

  source: {
    slug: "agricultural-easement",
    title: "WPRDC - Allegheny County Greenways",
    url: "https://data.wprdc.org/dataset/allegheny-county-greenways",
    resourceID: "0335f47a-ed05-4664-8ba3-7ddffd6828bc",
    publisher: alleghenyCounty,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.0335f47a-ed05-4664-8ba3-7ddffd6828bc._geom",
    sourceLayer: "table.0335f47a-ed05-4664-8ba3-7ddffd6828bc._geom",
  },

  extent: {
    label: "Allegheny County",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: { mode: "fixed", style: "#BF9B37" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },

  renderOptions: {
    filter: ["==", "Type", "Agricultural Easements"],
  },
};
