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
      value: { default: "#FFF", selected: "#FCEC52", hovered: "#bae6fd" },
    },
    borderColor: {
      mode: "fixed",
      value: { default: "#000", selected: "#000", hovered: "#bae6fd" },
    },
    opacity: {
      mode: "zoom",
      value: [
        [8, { default: 0.2, selected: 0.4, hovered: 0.7 }],
        [14.5, { default: 0.2, selected: 0.4, hovered: 0.7 }],
        [15, { default: 0, selected: 0, hovered: 0 }],
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
        [8, { default: 1, selected: 2, hovered: 2.5 }],
        [12, { default: 1, selected: 2, hovered: 2.5 }],
        [14.5, { default: 4, selected: 8, hovered: 10 }],
      ],
    },
    textField: {
      mode: "expression",
      expression: ["get", "NAME"],
    },
    textSize: {
      mode: "zoom",
      value: [
        [8, 6],
        [12, 12],
        [15, 12],
      ],
    },
  },

  interaction: {
    idField: "NAME",
    hoverPopupContent: "<h1>{{name}}</h1>",
    clickPopupContent: "<h1>{{name}}</h1>",
  },

  renderOptions: {
    filter: ["!=", "NAME", "PITTSBURGH"],
    noLegend: true,
  },
};
