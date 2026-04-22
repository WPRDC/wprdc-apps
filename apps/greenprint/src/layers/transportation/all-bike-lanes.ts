import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { bikePgh } from "@/data/publishers.ts";

const colors = ["#1B9E77", "#D95F02", "#7570B3", "#E7298A", "#66A61E"];

export const allBikeLanes: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "all-bike-lanes",
  title: "Bike Lanes",
  description: "Bike Lanes",

  source: {
    slug: "all-bike-lanes",
    title: "WPRDC - BikePGH's Pittsburgh Bike Map Geographic Data",
    url: "https://data.wprdc.org/dataset/shape-files-for-bikepgh-s-pittsburgh-bike-map",
    resourceID: "841de570-9de1-4568-87a1-f52dfb1b7622",
    publisher: bikePgh,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.841de570-9de1-4568-87a1-f52dfb1b7622._geom",
    sourceLayer: "table.841de570-9de1-4568-87a1-f52dfb1b7622._geom",
  },

  extent: {
    label: "Allegheny County",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Line,
    strokeColor: {
      mode: "fixed",
      style: "#66A61E",
    },
    strokeWidth: { mode: "fixed", style: 3 },
  },
};
