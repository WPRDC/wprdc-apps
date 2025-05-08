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
        [10, { default: 0, hovered: 1, selected: 4 }],
        [12, { default: 1, hovered: 3, selected: 4 }],
        [13, { default: 1, hovered: 3, selected: 4 }],
        [15, { default: 2, hovered: 4, selected: 4 }],
        [18, { default: 4, hovered: 6, selected: 8 }],
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
      <a href="/explore?parcel={{parid}}" target="_blank">See details in Explorer</a>
    `,

    // todo: allow iframes with wprdc domains
  },
};
