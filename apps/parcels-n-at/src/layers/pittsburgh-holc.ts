import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const pittsburghHOLC: LayerConfig = {
  slug: "pittsburgh-holc",
  title: "HOLC \"Redline\" Grades",
  description:
    "Redlining Maps from the Home Owners Loan Corporation (HOLC), 1937",
  type: GeoType.Polygon,
  publisher: {
    name: "Allegheny County",
    homepage: "https://www.alleghenycounty.us/",
    org: "allegheny-county",
  },

  source: {
    slug: "pittsburgh-holc",
    title: "Redlining",
    url: "https://data.wprdc.org/dataset/redlining-maps-from-the-home-owners-loan-corporation",
    resourceID: "9f67567a-a4d8-455f-804e-d22db49318a0",
  },

  tileSource: {
    tileJSONSource:
      "https://data.wprdc.org/tiles/table.9f67567a-a4d8-455f-804e-d22db49318a0._geom",
    sourceLayer: "table.9f67567a-a4d8-455f-804e-d22db49318a0._geom",
    minZoom: 7,
    maxZoom: 18.8,
  },

  symbology: {
    mode: "category",
    field: "holc_grade",
    categories: [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "C", label: "C" },
      { value: "D", label: "D" },
    ],

    color: {
      mode: "category",
      submode: "simple",
      value: {
        A: "#537f4d",
        B: "#53818c",
        C: "#c6bd63",
        D: "#a95861",
      },
    },

    borderColor: {
      mode: "fixed",
      value: "#000",
    },
    opacity: {
      mode: "fixed",
      value: 0.8
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
