import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { pittsburgh } from "@/data/publishers.ts";

export const slope25: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "slope-25",
  title: "Slope > 25%",
  description: "Land with a slope greater than 25%",

  source: {
    slug: "slope-25",
    title: "WPRDC - Slope > 25%",
    url: "https://data.wprdc.org/dataset/25-or-greater-slope",
    resourceID: "5ce91a56-0799-46ea-9585-13fa8db5979e",
    publisher: pittsburgh,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.5ce91a56-0799-46ea-9585-13fa8db5979e._geom",
    sourceLayer: "table.5ce91a56-0799-46ea-9585-13fa8db5979e._geom",
  },

  extent: {
    label: "Pittsburgh",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: { mode: "fixed", style: "#708090" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
