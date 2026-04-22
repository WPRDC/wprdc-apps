import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { alleghenyCounty } from "@/data/publishers.ts";

export const shareTheRoad: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "share-the-road",
  title: "Bike Lane/Share the Road",
  description: "Areas designated as Bike Lanes",

  source: {
    slug: "share-the-road",
    title: "WPRDC - Allegheny County Greenways",
    url: "https://data.wprdc.org/dataset/allegheny-county-greenways",
    resourceID: "e6a4f3f0-6308-440a-bddd-9b9612b6cc4e",
    publisher: alleghenyCounty,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.allegheny_greenways_bike_lane._geom",
    sourceLayer: "table.allegheny_greenways_bike_lane._geom",
  },

  extent: { label: "Allegheny County", bbox: [0, 0, 0, 0] },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: { mode: "fixed", style: "#89837E" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
