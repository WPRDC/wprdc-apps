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
      style: { default: "#FFF", selected: "#FCEC52", hovered: "#bae6fd" },
    },
    strokeColor: {
      mode: "fixed",
      style: { default: "#000", selected: "#000", hovered: "#bae6fd" },
    },
    fillOpacity: {
      mode: "fixed",
      style: [
        [8, { default: 0.2, selected: 0.4, hovered: 0.7 }],
        [14.5, { default: 0.2, selected: 0.4, hovered: 0.7 }],
        [15, { default: 0, selected: 0, hovered: 0 }],
      ],
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
        [8, { default: 1, selected: 2, hovered: 2.5 }],
        [12, { default: 1, selected: 2, hovered: 2.5 }],
        [14.5, { default: 4, selected: 8, hovered: 10 }],
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

  interaction: {
    idField: "NAME",
    hoverPopupContent: "<h1>{{NAME}}</h1>",
    clickPopupContent: "<h1>{{NAME}}</h1>",
  },


  legend: false,
  renderOptions: {
    filter: ["!=", "NAME", "PITTSBURGH"],
  },
};
