import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const ebllTract2024: LayerConfig = {
  slug: "ebll-tract-2024",
  title: "EBLL by Tract (2024)",
  description: "Elevated Blood Lead Level(EBLL) test results by tract in 2024.",

  source: {
    slug: "pittsburgh-neighborhoods",
    title: "City of Pittsburgh Neighborhoods",
    url: "https://data.wprdc.org/dataset/neighborhoods2",
    resourceID: "4af8e160-57e9-4ebf-a501-76ca1b42fc99",
    publisher: {
      name: "City of Pittsburgh",
      homepage: "http://www.pittsburghpa.gov/",
      org: "city-of-pittsburgh",
    },
  },

  tiles: {
    source: "https://data.wprdc.org/tiles/table.ebll_tracts.geom",
    sourceLayer: "table.ebll_tracts.geom",
    minZoom: 7,
    maxZoom: 18,
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,

    fillColor: {
      mode: "case",
      field: "percentEBLL2024",
      defaultStyle: "#f00",
      nullStyle: "#ccc",
      style: [
        {
          slug: "low",
          label: "< 10%",
          style: "#00f",
          operator: "<",
          operand: 10,
        },
        {
          slug: "medium",
          label: "10-20%",
          style: "#0f0",
          operator: "<",
          operand: 20,
        },
        {
          slug: "high",
          label: "> 20%",
          style: "#f00",
          operator: "<",
          operand: 100,
        },
      ],
    },
    strokeColor: {
      mode: "fixed",
      style: "#FFF",
    },
    fillOpacity: {
      mode: "fixed",
      style: 1,
    },
    strokeOpacity: {
      mode: "fixed",
      style: [
        [8, 1],
        [14.5, 1],
        [15, 0],
      ],
    },
    strokeWidth: {
      mode: "fixed",
      style: [
        [8, 1],
        [12, 1],
        [14.5, 4],
      ],
    },
  },

  interaction: {
    idField: "id",
    hoverPopupContent: `
      <h1 class="text-lg font-bold">
        <div class="font-sans leading-none">EBLL 2024</div>
      </h1>
      <div class="font-bold text-md leading-none mt-2"><b>% Kids w/ EBLL:</b> {{percentEBLL2024}}</div>
    `,
    clickPopupContent: `
      <h1 class="text-lg font-bold">
        <div class="font-sans leading-none">EBLL 2024</div>
      </h1>
      <div class="font-bold text-md leading-none mt-2"><b>% Kids w/ EBLL</b>{{percentEBLL2024}}</div>
    `,
  },
};
