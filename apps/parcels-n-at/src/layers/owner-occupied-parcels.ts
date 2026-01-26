import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const ownerOccupiedParcels: LayerConfig = {
  slug: "owner-occupied",
  title: "Owner Occupied Parcels",
  description: "Properties likely occupied by their owner.",

  source: {
    slug: "owner-occupied",
    title: "Owner Occupied Parcels",
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
    filter: ["==", "owner_occupied", true],
  },
  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,

    fillColor: {
      mode: "fixed",
      style: "#00454c",
    },

    strokeColor: {
      mode: "fixed",
      style: "#001a1b",
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

  legend: {
    geoType: GeoType.Polygon,
    slug: "owner-occupied",
    title: "Owner Occupied",
    type: "fixed",
    style: { fillColor: "#00454c", strokeColor: "#001a1b" },
    label: "Owner Occupied",
  },
};
