import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { alleghenyLandTrust } from "@/data/publishers.ts";
import { GeoType } from "@/types";

export const greenprint: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "greenprint",
  title: "Original Greenprint",
  description: "Original ALT Greenprint Plan",

  source: {
    slug: "greenprint",
    title: "ALT Original Greenprint", // TODO: fill in source title
    url: "", // TODO: fill in source url
    resourceID: "9d52e332-d516-4f75-98ae-b04a77e3a521",
    publisher: alleghenyLandTrust,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.9d52e332-d516-4f75-98ae-b04a77e3a521._geom",
    sourceLayer: "table.9d52e332-d516-4f75-98ae-b04a77e3a521._geom",
  },

  extent: { label: "Allegheny County", bbox: [0, 0, 0, 0] },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: { mode: "fixed", style: "#A5FFB9" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
