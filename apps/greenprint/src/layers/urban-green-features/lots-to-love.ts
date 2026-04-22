import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { grounded } from "@/data/publishers.ts";

export const lotsToLove: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "lots-to-love",
  title: "Lots To Love",
  description:
    "Vacant lot projects that are implemented, in progress, or just an idea.",

  source: {
    slug: "lots-to-love",
    title: "WPRDC - Lots to Love",
    url: "https://data.wprdc.org/dataset/lots-to-love",
    resourceID: "5598f3a2-0c54-4692-8533-3f2d54086d5c",
    publisher: grounded,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.5598f3a2-0c54-4692-8533-3f2d54086d5c._geom",
    sourceLayer: "table.5598f3a2-0c54-4692-8533-3f2d54086d5c._geom",
  },

  extent: { label: "Allegheny County", bbox: [0, 0, 0, 0] },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Point,
    fillColor: { mode: "fixed", style: "#C53B33" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
