import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { pittsburgh } from "@/data/publishers.ts";

export const citySteps: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "city-steps",
  title: "City Steps",
  description: "Public Staircases in the City of Pittsburgh",

  source: {
    slug: "city-steps",
    title: "WPRDC - Pittsburgh City Steps",
    url: "https://data.wprdc.org/dataset/city-steps",
    resourceID: "ff6dcffa-49ba-4431-954e-044ed519a4d7",
    publisher: pittsburgh,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.ff6dcffa-49ba-4431-954e-044ed519a4d7._geom",
    sourceLayer: "table.ff6dcffa-49ba-4431-954e-044ed519a4d7._geom",
  },

  extent: {
    label: "Pittsburgh",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Line,
    strokeColor: { mode: "fixed", style: "#7802DE" },
    strokeWidth: { mode: "fixed", style: 3 },
  },
};
