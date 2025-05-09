import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const largeParcelPortfolios: LayerConfig = {
  slug: "large-parcel-portfolios",
  title: "Large  Parcel Owners in Allegheny County",
  description: "",
  type: GeoType.Polygon,
  publisher: {
    name: "WPRDC",
    homepage: "https://wprdc.org/",
    org: "wprdc",
  },

  source: {
    slug: "large-parcel-portfolios",
    title: "Large  Parcel Owners in Allegheny County",
    url: "",
    resourceID: "",
  },

  tileSource: {
    tileJSONSource:
      "https://data.wprdc.org/tiles/table.large_parcel_portfolios.geom",
    sourceLayer: "table.large_parcel_portfolios.geom",
    minZoom: 10,
  },

  symbology: {
    mode: "category",
    field: "owner",

    categories: [
      { value: "ACHA", label: "ACHA" },
      { value: "Pittsburgh", label: "Pittsburgh" },
      { value: "URA", label: "URA" },
      { value: "HACP", label: "HACP" },
      { value: "Pitt", label: "Pitt" },
      { value: "CMU", label: "CMU" },
      { value: "UPMC", label: "UPMC" },
      { value: "Highmark", label: "Highmark" },
    ],

    color: {
      mode: "category",
      submode: "simple",
      value: {
        ACHA: "#9f2d00",
        Pittsburgh: "#facc15",
        URA: "#65a30d",
        HACP: "#f472b6",
        Pitt: "#003594",
        CMU: "#C41230",
        UPMC: "#771B61",
        Highmark: "#1290db",
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
