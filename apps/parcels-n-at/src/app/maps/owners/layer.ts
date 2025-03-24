import type { LayerConfig } from "@wprdc/types";
import {
  GeoType,
  QualitativeSymbologyProps,
  SymbologyMode,
} from "@wprdc/types";

export const largeParcelPortfolios: LayerConfig<QualitativeSymbologyProps> = {
  slug: "large-parcel-portfolios",
  title: "Large  Parcel Owners in Allegheny County",
  description: "",
  symbologyMode: SymbologyMode.Qualitative,
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
    colors: {
      field: "owner",
      categories: {
        ACHA: { label: "ACHA", color: "#9f2d00", borderColor: "#000" },
        Pittsburgh: {
          label: "Pittsburgh",
          color: "#facc15",
          borderColor: "#000",
        },
        URA: { label: "URA", color: "#65a30d", borderColor: "#000" },
        HACP: { label: "HACP", color: "#f472b6", borderColor: "#000" },
        Pitt: { label: "Pitt", color: "#003594", borderColor: "#000" },
        CMU: { label: "CMU", color: "#C41230", borderColor: "#000" },
        UPMC: { label: "UPMC", color: "#771B61", borderColor: "#000" },
        Highmark: { label: "Highmark", color: "#1290db", borderColor: "#000" },
      },
    },

    opacity: [
      [9, 1],
      [12, 0.8],
    ],

    borderOpacity: [
      [9, 1],
      [12, 0.8],
    ],

    borderWidth: [
      [10, 0],
      [12, 1],
      [13, 1],
      [15, 2],
      [18, 4],
    ],
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
