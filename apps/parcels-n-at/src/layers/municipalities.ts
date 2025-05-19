import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const municipalities: LayerConfig = {
  slug: "allegheny-county-municipalities",
  title: "Allegheny County Municipalities",
  description: "Towns, Cities, Boroughs, etc. in Allegheny County",
  type: GeoType.Polygon,
  publisher: {
    name: "Allegheny County",
    homepage: "https://www.alleghenycounty.us/",
    org: "allegheny-county",
  },

  source: {
    slug: "allegheny-county-municipalities",
    title: "Allegheny County Municipal Boundaries",
    url: "https://data.wprdc.org/dataset/allegheny-county-municipal-boundaries",
    resourceID: "b0cb0249-d1ba-45b7-9918-dc86fa8af04c",
  },

  tileSource: {
    tileJSONSource:
      "https://data.wprdc.org/tiles/table.b0cb0249-d1ba-45b7-9918-dc86fa8af04c._geom",
    sourceLayer: "table.b0cb0249-d1ba-45b7-9918-dc86fa8af04c._geom",
    minZoom: 7,
    maxZoom: 14.8,
  },

  symbology: {
    mode: "simple",
    color: {
      mode: "fixed",
      value: "#FFF",
    },
    borderColor: {
      mode: "fixed",
      value: "#000",
    },
    opacity: {
      mode: "zoom",
      value: [
        [8, 0.2],
        [14.5, 0.2],
        [15, 0],
      ],
    },
    borderOpacity: {
      mode: "zoom",
      value: [
        [8, 1],
        [14.5, 1],
        [15, 0],
      ],
    },
    borderWidth: {
      mode: "zoom",
      value: [
        [8, 1],
        [12, 1],
        [14.5, 4],
      ],
    },
    textField: { mode: "expression", expression: ["get", "NAME"] },
    textSize: {
      mode: "zoom",
      value: [
        [8, 0],
        [11.9, 0],
        [12, 9],
        [15, 12],
      ],
    },
  },

  renderOptions: {
    filter: ["!=", "NAME", "PITTSBURGH"],
    noLegend: true,
  },
};
