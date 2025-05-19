import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const alleghenyCountyBoundary: LayerConfig = {
  slug: "allegheny-county-boundary",
  title: "Allegheny County Boundary",
  description: "Boundary of Allegheny County",
  type: GeoType.Polygon,
  publisher: {
    name: "Allegheny County",
    homepage: "https://www.alleghenycounty.us/",
    org: "allegheny-county",
  },
  source: {
    slug: "allegheny-county",
    title: "Allegheny County Border",
    url: "https://data.wprdc.org/dataset/allegheny-county-boundary",
    resourceID: "09900a13-ab5d-4e41-94f8-7e4d129e9a4c",
  },

  tileSource: {
    tileJSONSource: "https://data.wprdc.org/tiles/county-border",
    sourceLayer: "56e47f38-30af-46a5-ac5f-50438e420a4a",
  },

  symbology: {
    mode: "simple",
    color: { mode: "fixed", value: "rgba(0,0,0,0)" },
    borderColor: { mode: "fixed", value: "#000" },
    opacity: { mode: "fixed", value: 0 },
    borderWidth: { mode: "fixed", value: 4 },
  },
  renderOptions: {
    noLegend: true,
  },
};
