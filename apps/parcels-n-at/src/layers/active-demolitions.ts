import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

const popupBody = `
  <h1 class="text-lg font-bold">
    <div class="font-sans leading-none">Active Demolition</div>
  </h1>
  <div class="text-sm font-semibold mt-1">{{address}}</div>
  <table class="mt-2 text-xs">
    <tr><th class="text-left pr-2">Work Type</th><td>{{work_type}}</td></tr>
    <tr><th class="text-left pr-2">Description</th><td>{{work_description}}</td></tr>
    <tr><th class="text-left pr-2">Property Type</th><td>{{commercial_or_residential}}</td></tr>
    <tr><th class="text-left pr-2">Status</th><td>{{status}}</td></tr>
    <tr><th class="text-left pr-2">Issued</th><td>{{issue_date}}</td></tr>
    <tr><th class="text-left pr-2">Contractor</th><td>{{contractor_name}}</td></tr>
    <tr><th class="text-left pr-2">Parcel</th><td class="font-mono">{{parcel_num}}</td></tr>
  </table>
`;

export const activeDemolitions: LayerConfig = {
  slug: "active-demolitions",
  title: "Active Demolitions",
  description:
    "Parcels in the City of Pittsburgh with an active demolition permit, colored by type of demolition.",
  source: {
    slug: "pli-permits",
    title: "PLI Permits",
    url: "https://data.wprdc.org/dataset/pli-permits",
    resourceID: "",
    publisher: {
      name: "City of Pittsburgh",
      homepage: "https://pittsburghpa.gov/",
      org: "city-of-pittsburgh",
    },
  },

  tiles: {
    source: "https://data.wprdc.org/tiles/table.active_demolitions.geom",
    sourceLayer: "table.active_demolitions.geom",
    minZoom: 10,
  },

  renderOptions: {
    aboveParcels: true,
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,

    fillColor: {
      mode: "category",
      field: "work_type",
      style: [
        {
          slug: "complete",
          value: "COMPLETE DEMOLITION",
          label: "Complete demolition",
          style: "#dc2626",
        },
        {
          slug: "city-funded",
          value: "CITY FUNDED DEMOLITION",
          label: "City-funded demolition",
          style: "#7c3aed",
        },
        {
          slug: "partial",
          value: "PARTIAL DEMOLITION",
          label: "Partial demolition",
          style: "#f59e0b",
        },
      ],
      defaultStyle: "#525252",
    },

    strokeColor: {
      mode: "fixed",
      style: "#000",
    },

    fillOpacity: {
      mode: "fixed",
      style: [
        [10, 0.9],
        [14, 0.7],
      ],
    },

    strokeWidth: {
      mode: "fixed",
      style: [
        [10, 0],
        [12, 1],
        [15, 2],
        [18, 3],
      ],
    },
  },

  interaction: {
    idField: "permit_id",
    hoverPopupContent: popupBody,
    clickPopupContent: popupBody,
  },
};
