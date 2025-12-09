import { GeoType, type LayerConfig } from "@wprdc/types";

export const largeParcelPortfolios: LayerConfig = {
  slug: "large-parcel-portfolios",
  title: "Large  Parcel Owners in Allegheny County",
  description: "",

  source: {
    slug: "large-parcel-portfolios",
    title: "Large Public-Owner Portfolios",
    url: "",
    resourceID: "",
    publisher: {
      name: "WPRDC",
      homepage: "https://wprdc.org/",
      org: "wprdc",
    },
  },

  tiles: {
    source: "https://data.wprdc.org/tiles/map.large_parcel_portfolios.geom",
    sourceLayer: "map.large_parcel_portfolios.geom",
    minZoom: 10,
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: {
      mode: "category",
      field: "owner",

      style: [
        { slug: "acha", value: "acha", label: "ACHA", style: "#9f2d00" },
        { slug: "city", value: "city", label: "Pittsburgh", style: "#facc15" },
        { slug: "ura", value: "ura", label: "URA", style: "#65a30d" },
        { slug: "hacp", value: "hacp", label: "HACP", style: "#f472b6" },
        { slug: "pitt", value: "upitt", label: "Pitt", style: "#003594" },
        { slug: "cmu", value: "cmu", label: "CMU", style: "#C41230" },
        { slug: "upmc", value: "upmc", label: "UPMC", style: "#771B61" },
        {
          slug: "highmark",
          value: "highmark",
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
  // interaction
  interaction: {
    idField: "parid",

    hoverPopupContent: `
      <h1 class="text-lg font-bold">
        <div class="font-sans leading-none">{{housenum}} {{street}}</div>
        <div class="mb-1 font-sans text-xs leading-none">{{city}}, PA {{zip}}</div>
      </h1>
      <div class="font-mono text-xs leading-none">{{parid}}</div>
      <div class="font-bold text-lg leading-none mt-2">{{owner}}</div>
      <div class="italic mt-2">Click to see details  in Explorer</div>
    `,
    clickPopupContent: `
      <h1 class="text-lg font-bold">
        <div class="font-sans leading-none">{{address}}</div>
        <div class="mb-1 font-sans text-xs leading-none">{{city}}</div>
      </h1>
      <div class="font-mono text-xs leading-none">{{parid}}</div>
      <div class="font-bold text-lg leading-none mt-2">{{owner}}</div>
      <a href="/explore?parcel={{parid}}&zoomPan=1" target="_blank">See details in Explorer</a>
    `,

  },
};
