import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { alleghenyCounty } from "@/data/publishers.ts";

export const trails: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "trails",
  title: "Trails",
  description: "Trails throughout Allegheny County",

  source: {
    slug: "trails",
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

  extent: { label: "Allegheny County", bbox: [0, 0, 0, 0] },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Line,
    strokeColor: { mode: "fixed", style: "#4F4D24" },
    strokeWidth: { mode: "fixed", style: 1 },
  },

  renderOptions: {
    filter: ["==", "Type", "Trails"],
  },
};
