import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { pittsburgh } from "@/data/publishers.ts";

export const pittsburghLandslideProne: LayerConfig<SimplifiedSymbologyConfig> =
  {
    slug: "pittsburgh-landslide-prone",
    title: "Landslide Prone Areas",
    description: "Landslide Prone areas in the City of Pittsburgh",

    source: {
      slug: "pittsburgh-landslide-prone",
      title: "WPRDC - Pittsburgh Landslide Prone",
      url: "https://data.wprdc.org/dataset/landslide-prone-areas",
      resourceID: "b5b45ac6-f8ef-4805-b4e4-fc7c63fb4075",
      publisher: pittsburgh,
    },

    tiles: {
      source:
        "https://data.wprdc.org/tiles/table.b5b45ac6-f8ef-4805-b4e4-fc7c63fb4075._geom",
      sourceLayer: "table.b5b45ac6-f8ef-4805-b4e4-fc7c63fb4075._geom",
    },

    extent: {
      label: "Pittsburgh",
      bbox: [0, 0, 0, 0],
    },

    symbology: {
      mode: "simplified",
      geoType: GeoType.Polygon,
      fillColor: { mode: "fixed", style: "#9F8170" },
      strokeColor: { mode: "fixed", style: "#000000" },
      strokeWidth: { mode: "fixed", style: 1 },
    },
  };
