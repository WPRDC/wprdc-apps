import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const vacantParcels: LayerConfig = {
  slug: "vacant-parcels",
  title: "Vacant Parcels",
  description: "Highlight parcels with building value < $1000",

  source: {
    slug: "vacant-parcels",
    title: "Vacant Parcels",
    url: "https://data.wprdc.org/dataset/property-assessments",
    resourceID: "",
    publisher: {
      name: "WPRDC",
      homepage: "https://wprdc.org/",
      org: "wprdc",
    },
  },

  tiles: {
    source: "https://data.wprdc.org/tiles/table.parcel_index.geom",
    sourceLayer: "table.parcel_index.geom",
    minZoom: 13,
  },
  renderOptions: {
    filter: ["==", "is_vacant", true],
  },
  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,

    fillColor: {
      mode: "fixed",
      style: "#000",
    },

    fillOpacity: {
      mode: "fixed",
      style: [
        [9, 0.8],
        [12, 0.6],
      ],
    },

    strokeOpacity: {
      mode: "fixed",
      style: [
        [9, 1],
        [12, 0.8],
      ],
    },

    strokeWidth: {
      mode: "fixed",
      style: [
        [10, 0],
        [12, 1],
        [13, 1],
        [15, 2],
        [18, 4],
      ],
    },
  },
};
