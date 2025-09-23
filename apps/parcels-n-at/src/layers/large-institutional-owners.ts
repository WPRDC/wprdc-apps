import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const largeInstitutionalOwners: LayerConfig = {
  slug: "large-institutional-owners",
  title: "Large Institutional-Owner Portfolios",
  description: "Highlight large parcel portfolios owned by local institutions.",

  source: {
    slug: "large-institutional-owners",
    title: "Large Institutional-Owner Portfolios",
    url: "",
    resourceID: "",
    publisher: {
      name: "WPRDC",
      homepage: "https://wprdc.org/",
      org: "wprdc",
    },
  },

  tiles: {
    source: "https://data.wprdc.org/tiles/table.large_parcel_portfolios.geom",
    sourceLayer: "table.large_parcel_portfolios.geom",
    minZoom: 10,
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: {
      mode: "category",
      field: "owner",
      style: [
        { slug: "acha", value: "ACHA", label: "ACHA", style: "#9f2d00" },
        {
          slug: "pittsburgh",
          value: "Pittsburgh",
          label: "Pittsburgh",
          style: "#facc15",
        },
        { slug: "ura", value: "URA", label: "URA", style: "#65a30d" },
        { slug: "hacp", value: "HACP", label: "HACP", style: "#f472b6" },
        { slug: "pitt", value: "Pitt", label: "Pitt", style: "#003594" },
        { slug: "cmu", value: "CMU", label: "CMU", style: "#C41230" },
        { slug: "upmc", value: "UPMC", label: "UPMC", style: "#771B61" },
        {
          slug: "highmark",
          value: "Highmark",
          label: "Highmark",
          style: "#1290db",
        },
      ],
      defaultStyle: "#000",
    },

    fillOpacity: {
      mode: "fixed",
      style: [
        [9, 1],
        [12, 0.8],
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
