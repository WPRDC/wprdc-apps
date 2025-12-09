import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const alleghenyCountyBoundary: LayerConfig = {
  slug: "allegheny-county-boundary",
  title: "Allegheny County Boundary",
  description: "Boundary of Allegheny County",

  source: {
    slug: "allegheny-county",
    title: "Allegheny County Border",
    url: "https://data.wprdc.org/dataset/allegheny-county-boundary",
    resourceID: "09900a13-ab5d-4e41-94f8-7e4d129e9a4c",
    publisher: {
      name: "Allegheny County",
      homepage: "https://www.alleghenycounty.us/",
      org: "allegheny-county",
    },
  },

  tiles: {
    source: "https://data.wprdc.org/tiles/county-border",
    sourceLayer: "56e47f38-30af-46a5-ac5f-50438e420a4a",
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,

    fillColor: { mode: "fixed", style: "rgba(0,0,0,0)" },
    strokeColor: { mode: "fixed", style: "#000" },
    fillOpacity: { mode: "fixed", style: 0 },
    strokeWidth: { mode: "fixed", style: 4 },
  },
  legend: false
};
