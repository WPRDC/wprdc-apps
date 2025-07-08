import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const countyMVA: LayerConfig = {
  slug: "allegheny-county-mva",
  title: "Allegheny County Market Value Analysis",
  description:
    "Regions of Allegheny County clustered around market value (2021)",
  type: GeoType.Polygon,
  publisher: {
    name: "Allegheny County",
    homepage: "https://www.alleghenycounty.us/",
    org: "allegheny-county",
  },

  source: {
    slug: "allegheny-county-mva",
    title: "Allegheny County Market Value Analysis (2021)",
    url: "https://data.wprdc.org/dataset/market-value-analysis-2021",
    resourceID: "ec09f5ad-f43e-4f06-af3a-65641c2818dc",
  },

  tileSource: {
    tileJSONSource:
      "https://data.wprdc.org/tiles/table.ec09f5ad-f43e-4f06-af3a-65641c2818dc._geom",
    sourceLayer: "table.ec09f5ad-f43e-4f06-af3a-65641c2818dc._geom",
    minZoom: 7,
    maxZoom: 18.8,
  },

  symbology: {
    mode: "category",
    field: "MVA21",
    categories: [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "C", label: "C" },
      { value: "D", label: "D" },
      { value: "E", label: "E" },
      { value: "F", label: "F" },
      { value: "G", label: "G" },
      { value: "H", label: "H" },
      { value: "I", label: "I" },
      { value: "J", label: "J" },
      { value: "NC", label: "Insufficient Data" },
    ],

    color: {
      mode: "category",
      submode: "simple",
      value: {
        A: "#9F87C7",
        B: "#7DA3DE",
        C: "#A2C0EB",
        D: "#82A6AD",
        E: "#9DD9C5",
        F: "#F5A895",
        G: "#F7D163",
        H: "#FED78E",
        I: "#F5F57A",
        J: "#DEDE3C",
        NC: "#bbb",
      },
    },

    borderColor: {
      mode: "fixed",
      value: "#000",
    },
    opacity: {
      mode: "category",
      submode: "simple",
      value: {
        A: 0.8,
        B: 0.8,
        C: 0.8,
        D: 0.8,
        E: 0.8,
        F: 0.8,
        G: 0.8,
        H: 0.8,
        I: 0.8,
        J: 0.8,
        NC: 0.6,
      },
    },
    borderOpacity: {
      mode: "zoom",
      value: [
        [8, 1],
        [14.5, 1],
        [15, 0],
      ],
    },
    borderWidth: {
      mode: "zoom",
      value: [
        [8, 1],
        [12, 1],
        [14.5, 2],
      ],
    },
  },
};
