import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const pre78parcels: LayerConfig = {
  slug: "pre-78-parcels",
  title: "Homes built before 1978",
  description: "Residential buildings built before the 1978 lead paint ban",
  type: GeoType.Polygon,
  publisher: {
    name: "WPRDC",
    homepage: "https://wprdc.org/",
    org: "wprdc",
  },

  source: {
    slug: "pre-78-parcels",
    title: "Homes built before 1978",
    url: "https://data.wprdc.org/dataset/property-assessments",
    resourceID: "",
  },

  tileSource: {
    tileJSONSource:
      "https://data.wprdc.org/tiles/table.parcel_index.geom",
    sourceLayer: "table.parcel_index.geom",
    minZoom: 10,
  },
  renderOptions: {
    filter: ["<=", "year_built", 1978],

  },
  symbology: {
    mode: "simple",

    color: {
      mode: "fixed",
      value: "#5335a6",
    },

    opacity: {
      mode: "zoom",
      value: [
        [9, 0.8],
        [12, 0.6],
      ],
    },

    borderOpacity: {
      mode: "zoom",
      value: [
        [9, 1],
        [12, 0.8],
      ],
    },

    borderWidth: {
      mode: "zoom",
      value: [
        [10, 0],
        [12, 1],
        [13, 1],
        [15, 2],
        [18, 4],
      ],
    },
  },
};
