import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const largePublicOwners: LayerConfig = {
  slug: "large-parcel-portfolios",
  title: "Large Public and Institutional Portfolios",
  description: "Highlight large parcel portfolios owned by governments and large institutions.",
  type: GeoType.Polygon,
  publisher: {
    name: "WPRDC",
    homepage: "https://wprdc.org/",
    org: "wprdc",
  },

  source: {
    slug: "large-parcel-portfolios",
    title: "Large Public-Owner Portfolios",
    url: "",
    resourceID: "",
  },

  tileSource: {
    tileJSONSource:
      "https://data.wprdc.org/tiles/map.large_parcel_portfolios.geom",
    sourceLayer: "map.large_parcel_portfolios.geom",
    minZoom: 10,
  },

  symbology: {
    mode: "category",
    field: "owner",

    categories: [
      { value: "acha", label: "ACHA" },
      { value: "city", label: "Pittsburgh" },
      { value: "ura", label: "URA" },
      { value: "hacp", label: "HACP" },
      { value: "pitt", label: "Pitt" },
      { value: "cmu", label: "CMU" },
      { value: "upmc", label: "UPMC" },
      { value: "highmark", label: "Highmark" },
    ],

    color: {
      mode: "category",
      submode: "simple",
      value: {
        acha: "#9f2d00",
        city: "#facc15",
        ura: "#65a30d",
        hacp: "#f472b6",
        pitt: "#003594",
        cmu: "#C41230",
        upmc: "#771B61",
        highmark: "#1290db",
      },
    },

    opacity: {
      mode: "zoom",
      value: [
        [9, 1],
        [12, 0.8],
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
