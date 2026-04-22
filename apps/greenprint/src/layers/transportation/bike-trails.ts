import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { alleghenyCounty } from "@/data/publishers.ts";

export const bikeTrails: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "bike-trails",
  title: "Bike Trails",
  description:
    "BikePGH developed this map in 2007 and has been publishing it both on paper and online ever since.",

  source: {
    slug: "bike-trails",
    title: "WPRDC - Pittsburgh Bike Map Geographic Data",
    url: "https://data.wprdc.org/dataset/shape-files-for-bikepgh-s-pittsburgh-bike-map",
    resourceID: "08c150ee-5bd6-4121-9db5-3cf5a189036b",
    publisher: alleghenyCounty,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.08c150ee-5bd6-4121-9db5-3cf5a189036b._geom",
    sourceLayer: "table.08c150ee-5bd6-4121-9db5-3cf5a189036b._geom",
  },

  extent: {
    label: "Allegheny County",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Line,
    strokeColor: { mode: "fixed", style: "#007076" },
    strokeWidth: { mode: "fixed", style: 3 },
  },
};
