import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { pittsburgh } from "@/data/publishers.ts";

export const pittsburghParks: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "pittsburgh-parks",
  title: "City Parks",
  description: "Parks managed by the City of Pittsburgh",

  source: {
    slug: "pittsburgh-parks",
    title: "WPRDC - Pittsburgh Parks",
    url: "https://data.wprdc.org/dataset/parks",
    resourceID: "ca4ee6a6-3058-487f-9724-2a335b2d79f2",
    publisher: pittsburgh,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.ca4ee6a6-3058-487f-9724-2a335b2d79f2._geom",
    sourceLayer: "table.ca4ee6a6-3058-487f-9724-2a335b2d79f2._geom",
  },

  extent: { label: "Pittsburgh", bbox: [0, 0, 0, 0] },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: { mode: "fixed", style: "#006D2C" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
