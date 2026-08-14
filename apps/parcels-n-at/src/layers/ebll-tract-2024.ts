import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

/** Years available in the `table.ebll_tracts.geom` tile source. */
const EBLL_YEARS = [
  2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
].reverse();

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
      defaultStyle: "#ccc",
      nullStyle: "#ccc",
      style: [
        {
          slug: "low",
          label: "< 10%",
          style: "#2c7fb8",
          operator: "<",
          operand: 10,
        },
        {
          slug: "medium",
          label: "10-20%",
          style: "#7fcdbb",
          operator: "<",
          operand: 20,
        },
        {
          slug: "high",
          label: "> 20%",
          style: "#edf8b1",
          operator: "<",
          operand: 100,
        },
      ],
    },
    strokeColor: {
      mode: "fixed",
      style: "#000",
    },
    fillOpacity: {
      mode: "fixed",
      style: 0.6,
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
      <p><span class="text-xs font-bold">Tract: </span><span class="text-xs font-mono">{{id}}</span></p>
      
      <table class="mt-1 text-xs w-full">
            <caption class="text-xs font-bold text-left italic">% Kids w/ EBLL</caption>
        <thead>
          <tr class="border-b-1"><th class="pr-2 text-left">Year</th><th class="text-left">%</th></tr>
        </thead>
        <tbody>
${EBLL_YEARS.map(
      (year) => `          <tr class="even:bg-gray-200">
            <td class="pr-2">${year}</td>
            <td>{{#percentEBLL${year}}}{{percentEBLL${year}}}%{{/percentEBLL${year}}}{{^percentEBLL${year}}}{{#note${year}}}{{note${year}}}{{/note${year}}}{{^note${year}}}N/A{{/note${year}}}{{/percentEBLL${year}}}</td>
          </tr>`,
    ).join("\n")}
        </tbody>
      </table>
    `,
    clickPopupContent: "",
  },
};
