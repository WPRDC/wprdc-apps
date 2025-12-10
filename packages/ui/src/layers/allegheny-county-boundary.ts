import type { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const alleghenyCountyBoundary: LayerConfig<SimplifiedSymbologyConfig> = {
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
    source:
      "https://data.wprdc.org/tiles/table.09900a13-ab5d-4e41-94f8-7e4d129e9a4c._geom",
    sourceLayer: "table.09900a13-ab5d-4e41-94f8-7e4d129e9a4c._geom",
  },

  legend: false,
  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: { mode: "fixed", style: "rgba(0,0,0,0)" },
    strokeColor: { mode: "fixed", style: "#000" },
    fillOpacity: { mode: "fixed", style: 0 },
    strokeWidth: { mode: "fixed", style: [[12, 4]] },
  },
};
