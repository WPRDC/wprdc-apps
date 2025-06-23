import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const parcelLeadlineStatus: LayerConfig = {
  slug: "parcel-leadline-status",
  title: "Parcels by Water Line Lead Status (Public | Private)",
  description: "",
  type: GeoType.Polygon,
  publisher: {
    name: "WPRDC",
    homepage: "https://wprdc.org/",
    org: "wprdc",
  },

  source: {
    slug: "parcel-leadline-status",
    title: "Parcels by Water Line Lead Status",
    url: "",
    resourceID: "",
  },

  tileSource: {
    tileJSONSource: "https://data.wprdc.org/tiles/map.lead_by_spatial.boundary",
    sourceLayer: "map.lead_by_spatial.boundary",
    minZoom: 10,
  },

  symbology: {
    mode: "category",
    field: "public_private",

    categories: [
      { value: "LEAD | LEAD", label: "LEAD | LEAD" },
      { value: "LEAD | NOT LEAD", label: "LEAD | NOT LEAD" },
      { value: "LEAD | UNKNOWN", label: "LEAD | UNKNOWN" },
      { value: "NOT LEAD | LEAD", label: "NOT LEAD | LEAD" },
      { value: "NOT LEAD | NOT LEAD", label: "NOT LEAD | NOT LEAD" },
      { value: "NOT LEAD | UNKNOWN", label: "NOT LEAD | UNKNOWN" },
      { value: "UNKNOWN | LEAD", label: "UNKNOWN | LEAD" },
      { value: "UNKNOWN | NO LINE", label: "UNKNOWN | NO LINE" },
      { value: "UNKNOWN | NOT LEAD", label: "UNKNOWN | NOT LEAD" },
      { value: "UNKNOWN | UNKNOWN", label: "UNKNOWN | UNKNOWN" },
    ],

    color: {
      mode: "category",
      submode: "simple",
      value: {
        "LEAD | LEAD": "#6c6c6c",
        "LEAD | NOT LEAD": "#C68346",
        "LEAD | UNKNOWN": "#000",
        "NOT LEAD | LEAD": "#6c6c6c",
        "NOT LEAD | NOT LEAD": "#C68346",
        "NOT LEAD | UNKNOWN": "#000",
        "UNKNOWN | LEAD": "#6c6c6c",
        "UNKNOWN | NO LINE": "#000",
        "UNKNOWN | NOT LEAD": "#C68346",
        "UNKNOWN | UNKNOWN": "#000",
      },
    },

    borderColor: {
      mode: "category",
      submode: "simple",
      value: {
        "LEAD | LEAD": "#6c6c6c",
        "LEAD | NOT LEAD": "#6c6c6c",
        "LEAD | UNKNOWN": "#6c6c6c",
        "NOT LEAD | LEAD": "#C68346",
        "NOT LEAD | NOT LEAD": "#C68346",
        "NOT LEAD | UNKNOWN": "#C68346",
        "UNKNOWN | LEAD": "#000",
        "UNKNOWN | NO LINE": "#000",
        "UNKNOWN | NOT LEAD": "#000",
        "UNKNOWN | UNKNOWN": "#000",
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

  interaction: {
    idField: "parcel_id",
    hoverPopupContent: `
      <h1 class="text-lg font-bold">
        <div class="font-sans leading-none">{{address}}</div>
      </h1>
      <div class="font-mono text-xs leading-none">{{parcel_id}}</div>
      <div class="font-bold text-lg leading-none mt-2"><b>Public Side:</b> {{public_status}}</div>
      <div class="font-bold text-lg leading-none mt-2"><b>Private Side:</b> {{private_status}}</div>
      <div class="italic mt-2">Click to see details in Explorer</div>
    `,
    clickPopupContent: `
      <h1 class="text-lg font-bold">
        <div class="font-sans leading-none">{{address}}</div>
      </h1>
      <div class="font-mono text-xs leading-none">{{parcel_id}}</div>
      <div class="font-bold text-lg leading-none mt-2"><b>Public Side:</b> {{public_status}}</div>
      <div class="font-bold text-lg leading-none mt-2"><b>Private Side:</b> {{private_status}}</div>   
         <div class="italic mt-2">Click to see details in Explorer</div>
    `,
  },
};
