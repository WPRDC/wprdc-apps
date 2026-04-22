import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { alleghenyCounty } from "@/data/publishers.ts";

export const alleghenyCountyHydrologyAreas: LayerConfig<SimplifiedSymbologyConfig> =
  {
    slug: "allegheny-county-hydrology-areas",
    title: "Hydrology Areas",
    description:
      "The Hydrology Feature Dataset contains photogrammetrically compiled water drainage features and structures including rivers, streams, drainage canals, locks, dams, lakes, ponds,...",

    source: {
      slug: "allegheny-county-hydrology-areas",
      title: "WPRDC - Allegheny County Hydrology Areas",
      url: "https://data.wprdc.org/dataset/allegheny-county-hydrology-areas",
      resourceID: "74aebbef-0df1-441b-9b4b-54cf7c38f567",
      publisher: alleghenyCounty,
    },

    tiles: {
      source:
        "https://data.wprdc.org/tiles/table.74aebbef-0df1-441b-9b4b-54cf7c38f567._geom",
      sourceLayer: "table.74aebbef-0df1-441b-9b4b-54cf7c38f567._geom",
    },

    extent: {
      label: "Allegheny County",
      bbox: [0, 0, 0, 0],
    },

    symbology: {
      mode: "simplified",
      geoType: GeoType.Polygon,
      fillColor: { mode: "fixed", style: "#89CFF0" },
      strokeColor: { mode: "fixed", style: "#000" },
      strokeWidth: { mode: "fixed", style: 1 },
    },
  };
