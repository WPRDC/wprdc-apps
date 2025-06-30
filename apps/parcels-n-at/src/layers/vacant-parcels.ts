import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const vacantParcels: LayerConfig = {
  slug: "vacant-parcels",
  title: "Vacant Parcels",
  description: "",
  type: GeoType.Polygon,
  publisher: {
    name: "WPRDC",
    homepage: "https://wprdc.org/",
    org: "wprdc",
  },

  source: {
    slug: "vacant-parcels",
    title: "Vacant Parcels",
    url: "",
    resourceID: "",
  },

  tileSource: {
    tileJSONSource:
      "https://data.wprdc.org/tiles/table.parcel_index.geom",
    sourceLayer: "table.parcel_index.geom",
    minZoom: 13,
  },
  renderOptions: {
    filter: ["==", "is_vacant", true],
    noLegend: true,
  },
  symbology: {
    mode: "simple",


    color: {
      mode: "fixed",
      value: "#000",
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
