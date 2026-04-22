import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { alleghenyCounty } from "@/data/publishers.ts";

export const alleghenyCountyHydrologyLines: LayerConfig<SimplifiedSymbologyConfig> =
  {
    slug: "allegheny-county-hydrology-lines",
    title: "Hydrology Lines",
    description:
      "The Hydrology Feature Dataset contains photogrammetrically compiled water drainage features and structures including rivers, streams, drainage canals, locks, dams, lakes, ponds,...",

    source: {
      slug: "allegheny-county-hydrology-lines",
      title: "WPRDC - Allegheny County Hydrology lines",
      url: "https://data.wprdc.org/dataset/allegheny-county-hydrology-lines",
      resourceID: "083c1400-999f-4409-a1a2-fd27ad5592d5",
      publisher: alleghenyCounty,
    },

    tiles: {
      source:
        "https://data.wprdc.org/tiles/table.083c1400-999f-4409-a1a2-fd27ad5592d5._geom",
      sourceLayer: "table.083c1400-999f-4409-a1a2-fd27ad5592d5._geom",
    },

    extent: {
      label: "Allegheny County",
      bbox: [0, 0, 0, 0],
    },

    symbology: {
      mode: "simplified",
      geoType: GeoType.Line,
      strokeColor: { mode: "fixed", style: "#000080" },
      strokeWidth: { mode: "fixed", style: 1 },
    },
  };
