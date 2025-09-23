import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const pre78parcels: LayerConfig = {
  slug: "pre-78-parcels",
  title: "Homes built before lead paint ban",
  description: "Residential buildings built before the 1978 lead paint ban",

  source: {
    slug: "pre-78-parcels",
    title: "Homes built before lead paint ban",
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
    minZoom: 10,
  },

  renderOptions: {
    filter: ["all", ["<=", "year_built", 1978], ["==", "class", "RESIDENTIAL"]],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,

    fillColor: {
      mode: "case",
      field: "year_built",
      style: [
        {
          slug: 'oldest',
          label: "pre-1940",
          operator: "<",
          operand: 1940,
          style: "#1c9099",
        },
        {
          slug: 'older',
          label: "1940-1959",
          operator: "<",
          operand: 1960,
          style: "#a6bddb",
        },
        {
          slug: 'old',
          label: "1960-1978",
          operator: "<",
          operand: 1978,
          style: "#ece2f0",
        },
      ],
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
