import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";
import { darken } from "@wprdc/ui";

export const parcelLeadlineStatus: LayerConfig = {
  slug: "parcel-leadline-status",
  title: "Parcels by Water Line Lead Status",
  description: "Status of pipe material used on private (property) and public (street) water lines per parcel. Only available for certain water providers.",


  source: {
    slug: "parcel-leadline-status",
    title: "Parcels by Water Line Lead Status",
    url: "",
    resourceID: "",
    publisher: {
      name: "WPRDC",
      homepage: "https://wprdc.org/",
      org: "wprdc",
    },
  },

  tiles: {
    source: "https://data.wprdc.org/tiles/map.parcel_level_lead_info.parcel_geom",
    sourceLayer: "map.parcel_level_lead_info.parcel_geom",
    minZoom: 10,
  },

  renderOptions: {
    filter: ['!=', ['get', 'final_private_lead_status'], ['literal', null]]
  },


  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,

    fillColor: {
      mode: "category",
      field: "final_private_lead_status",
      style: [
        { slug: "lead" ,value: "LEAD", label: "Lead", style: "green" },
        { slug: "not-lead" ,value: "NOT LEAD", label: "Not Lead", style: "#C68346" },
        { slug: "unknown" ,value: "UNKNOWN", label: "Unknown", style: "#FFF" },
      ],
    },

    strokeColor: {
      mode: "category",
      field: "final_public_status",
      style: [
        { slug: "lead" ,value: "LEAD", label: "Lead", style: darken(.2)("green") },
        { slug: "not-lead" ,value: "NOT LEAD", label: "Not Lead", style: darken(.2)("#C68346")  },
        { slug: "unknown" ,value: "UNKNOWN", label: "Unknown", style: darken(.2)("#FFF") },
      ],
    },

    fillOpacity: {
      mode:  "fixed",
      style: [
        [9, 1],
        [12, 0.8],
      ],
    },

    strokeOpacity: {
      mode:  "fixed",
      style: [
        [9, 1],
        [12, 0.8],
      ],
    },

    strokeWidth: {
      mode:  "fixed",
      style: [
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
        <div class="font-sans leading-none">Water Line Status</div>
      </h1>
      <div class="font-bold text-md leading-none mt-2"><b>Public Side:</b> {{final_public_status}}</div>
      <div class="font-bold text-md leading-none mt-2"><b>Private Side:</b> {{final_private_lead_status}}</div>
      <div class="italic mt-2">Click to see details in Explorer</div>
    `,
    clickPopupContent: `
      <h1 class="text-lg font-bold">
        <div class="font-sans leading-none">Water Line Status</div>
      </h1>
      <div class="font-bold text-md leading-none mt-2"><b>Public Side:</b> {{final_public_status}}</div>
      <div class="font-bold text-md leading-none mt-2"><b>Private Side:</b> {{final_private_lead_status}}</div>   
         <div class="italic mt-2">Click to see details in Explorer</div>
    `,
  },
};
