import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const parcelLayer: LayerConfig = {
  // immutable properties
  slug: "parcels",
  title: "Parcels",
  description: "",

  source: {
    slug: "parcels",
    title: "Allegheny County Parcel Boundaries",
    url: "https://data.wprdc.org/dataset/allegheny-county-parcel-boundaries1",
    resourceID: "3f50d47a-ab54-4da2-9f03-8519006e9fc9",
    publisher: {
      name: "Allegheny County",
      homepage: "https://www.alleghenycounty.us/",
      org: "allegheny-county",
    },
  },

  tiles: {
    source: "https://data.wprdc.org/tiles/table.parcel_index.geom",
    sourceLayer: "table.parcel_index.geom",
    minZoom: 15,
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: {
      mode: "fixed",
      style: { default: "#FFF", selected: "#FCEC52", hovered: "#bae6fd" },
    },

    strokeColor: {
      mode: "fixed",
      style: { default: "#000", selected: "#000", hovered: "#bae6fd" },
    },
    fillOpacity: {
      mode: "fixed",
      style: [
        [16, { default: 0.1, selected: 0.5, hovered: 0.6 }],
        [18, { default: 0.2, selected: 0.6, hovered: 0.7 }],
      ],
    },

    strokeOpacity: { mode: "fixed", style: [[16, 1]] },

    textField: { mode: "expression", expression: ["get", "housenum"] },
    textSize: {
      mode: "fixed",
      style: [
        [16, 6],
        [16.5, 10],
        [17.5, 10],
        [21, 18],
      ],
    },
  },

  // interaction
  interaction: {
    idField: "parcel_id",
    hoverPopupContent: `
      <h1 class="text-lg font-bold">
        <div class="font-sans leading-none">{{housenum}} {{street}}</div>
        <div class="mb-1 font-sans text-xs leading-none">{{city}}, PA {{zip}}</div>
      </h1>
      <div class="font-mono text-xs leading-none">{{parcel_id}}</div>
    `,
    clickPopupContent: `
      <h1 class="text-lg font-bold">
        <div class="font-sans leading-none">{{address}}</div>
        <div class="mb-1 font-sans text-xs leading-none">{{city}}</div>
      </h1>
      <div class="font-mono text-xs leading-none">{{parcel_id}}</div>
    `,
    ignoreCase: ["==", ["get", "parcel_id"], "COMMON GROUND"],
  },
  legend: false,
};
