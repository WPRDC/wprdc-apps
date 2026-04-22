import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { growPgh } from "@/data/publishers.ts";

export const growPghGardens: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "grow-pgh-gardens",
  title: "Food Gardens",
  description:
    "Food growing locations registered with Grow Pittsburgh. Data includes community gardens, community farms, schoolyard gardens, or urban farms. This data is included in Grow Pittsburgh's Grower's Map",

  source: {
    slug: "grow-pgh-gardens",
    title: "WPRDC - Grow Pittsburgh Food Gardens",
    url: "https://data.wprdc.org/dataset/grow-pittsburgh-food-gardens",
    resourceID: "dbdfcb3e-8fa5-4468-9b05-f69562798f7a",
    publisher: growPgh,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.dbdfcb3e-8fa5-4468-9b05-f69562798f7a._geom",
    sourceLayer: "table.dbdfcb3e-8fa5-4468-9b05-f69562798f7a._geom",
  },

  extent: { label: "Allegheny County", bbox: [0, 0, 0, 0] },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Point,
    fillColor: { mode: "fixed", style: "#E38633" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
