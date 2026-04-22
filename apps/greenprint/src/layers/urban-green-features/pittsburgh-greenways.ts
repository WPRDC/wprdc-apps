import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { pittsburgh } from "@/data/publishers.ts";

export const pittsburghGreenways: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "pittsburgh-greenways",
  title: "City Greenways",
  description: "Greenways in the City of Pittsburgh",

  source: {
    slug: "pittsburgh-greenways",
    title: "WPRDC - Greenways",
    url: "https://data.wprdc.org/dataset/greenways",
    resourceID: "7c2b901b-6328-4e40-99a3-4b5952cd6f31",
    publisher: pittsburgh,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.0335f47a-ed05-4664-8ba3-7ddffd6828bc._geom",
    sourceLayer: "table.0335f47a-ed05-4664-8ba3-7ddffd6828bc._geom",
  },

  extent: { label: "Pittsburgh", bbox: [0, 0, 0, 0] },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: { mode: "fixed", style: "#01796F" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },

  renderOptions: {
    filter: ["==", "Type", "City of Pittsburgh Greenways"],
  },
};
