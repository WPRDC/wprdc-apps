import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { alleghenyCounty } from "@/data/publishers.ts";

export const alleghenyWatersheds: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "ac-watersheds",
  title: "Watershed Boundaries",
  description: "Watershed Boundaries in Allegheny County",

  source: {
    slug: "ac-watersheds",
    title: "WPRDC - Allegheny County Watershed Boundaries",
    url: "https://data.wprdc.org/dataset/allegheny-county-watershed-boundaries",
    resourceID: "4b16b8a5-d156-4f53-911d-493a82492244",
    publisher: alleghenyCounty,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.4b16b8a5-d156-4f53-911d-493a82492244._geom",
    sourceLayer: "table.4b16b8a5-d156-4f53-911d-493a82492244._geom",
  },

  extent: {
    label: "Allegheny County",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: { mode: "fixed", style: "#13A" },
    fillOpacity: { mode: "fixed", style: 0.3 },
    strokeColor: { mode: "fixed", style: "#13A" },
  },
};
