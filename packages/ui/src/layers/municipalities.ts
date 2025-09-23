import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const municipalities: LayerConfig = {
  slug: "allegheny-county-municipalities",
  title: "Allegheny County Municipalities",
  description: "Towns, Cities, Boroughs, etc. in Allegheny County",

  source: {
    slug: "allegheny-county-municipalities",
    title: "Allegheny County Municipal Boundaries",
    url: "https://data.wprdc.org/dataset/allegheny-county-municipal-boundaries",
    resourceID: "b0cb0249-d1ba-45b7-9918-dc86fa8af04c",
    publisher: {
      name: "Allegheny County",
      homepage: "https://www.alleghenycounty.us/",
      org: "allegheny-county",
    },
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.b0cb0249-d1ba-45b7-9918-dc86fa8af04c._geom",
    sourceLayer: "table.b0cb0249-d1ba-45b7-9918-dc86fa8af04c._geom",
    minZoom: 7,
    maxZoom: 14.8,
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: {
      mode: "fixed",
      style: "#FFF",
    },
    strokeColor: {
      mode: "fixed",
      style: "#000",
    },
    fillOpacity: {
      mode: "fixed",
      style: 0,
    },
    strokeOpacity: {
      mode: "fixed",
      style: [
        [8, 1],
        [14.5, 1],
        [15, 0],
      ],
    },
    strokeWidth: {
      mode: "fixed",
      style: [
        [8, 1],
        [12, 1],
        [14.5, 4],
      ],
    },
    textField: { mode: "expression", expression: ["get", "NAME"] },
    textSize: {
      mode: "fixed",
      style: [
        [8, 0],
        [11.9, 0],
        [12, 9],
        [15, 12],
      ],
    },
  },

  legend: false,
  renderOptions: {
    filter: ["!=", "NAME", "PITTSBURGH"],
  },
};
