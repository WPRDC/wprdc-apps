import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { alleghenyCounty } from "@/data/publishers.ts";

export const alleghenyParks: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "allegheny-parks",
  title: "County Parks",
  description: "Parks managed by Allegheny County",

  source: {
    slug: "allegheny-parks",
    title: "WPRDC - Allegheny County Parks",
    url: "https://data.wprdc.org/dataset/allegheny-county-parks-outlines",
    resourceID: "69b65369-05f5-44b1-a6c4-2a16e109d1f6",
    publisher: alleghenyCounty,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.69b65369-05f5-44b1-a6c4-2a16e109d1f6._geom",
    sourceLayer: "table.69b65369-05f5-44b1-a6c4-2a16e109d1f6._geom",
  },

  extent: {
    label: "Allegheny County",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: { mode: "fixed", style: "#00441B" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
