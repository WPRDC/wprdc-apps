import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const countyMVA: LayerConfig = {
  slug: "allegheny-county-mva",
  title: "Allegheny County Market Value Analysis",
  description:
    "Regions of Allegheny County clustered around market value (2021)",

  source: {
    slug: "allegheny-county-mva",
    title: "Allegheny County Market Value Analysis (2021)",
    url: "https://data.wprdc.org/dataset/market-value-analysis-2021",
    resourceID: "ec09f5ad-f43e-4f06-af3a-65641c2818dc",
    publisher: {
      name: "Allegheny County",
      homepage: "https://www.alleghenycounty.us/",
      org: "allegheny-county",
    },
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.ec09f5ad-f43e-4f06-af3a-65641c2818dc._geom",
    sourceLayer: "table.ec09f5ad-f43e-4f06-af3a-65641c2818dc._geom",
    minZoom: 7,
    maxZoom: 18.8,
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor:{
      mode: "category",
      field: "MVA21",

      style: [
        { slug: "a", value: "A", label: "A", style: "#9F87C7" },
        { slug: "b", value: "B", label: "B", style: "#7DA3DE" },
        { slug: "c", value: "C", label: "C", style: "#A2C0EB" },
        { slug: "d", value: "D", label: "D", style: "#82A6AD" },
        { slug: "e", value: "E", label: "E", style: "#9DD9C5" },
        { slug: "f", value: "F", label: "F", style: "#F5A895" },
        { slug: "g", value: "G", label: "G", style: "#F7D163" },
        { slug: "h", value: "H", label: "H", style: "#FED78E" },
        { slug: "i", value: "I", label: "I", style: "#F5F57A" },
        { slug: "j", value: "J", label: "J", style: "#DEDE3C" },
        { slug: "nc", value: "NC", label: "Insufficient Data", style: "#bbb" },
      ],
      defaultStyle: "#000"
    },

    strokeColor: {
      mode: "fixed",
      style: "#000",
    },
    fillOpacity: {
      mode: "category",
      field: "MVA21",

      style: [
        { slug: "a", value: "A", label: "A", style: 0.8 },
        { slug: "b", value: "B", label: "B", style: 0.8 },
        { slug: "c", value: "C", label: "C", style: 0.8 },
        { slug: "d", value: "D", label: "D", style: 0.8 },
        { slug: "e", value: "E", label: "E", style: 0.8 },
        { slug: "f", value: "F", label: "F", style: 0.8 },
        { slug: "g", value: "G", label: "G", style: 0.8 },
        { slug: "h", value: "H", label: "H", style: 0.8 },
        { slug: "i", value: "I", label: "I", style: 0.8 },
        { slug: "j", value: "J", label: "J", style: 0.8 },
        { slug: "nc", value: "NC", label: "Insufficient Data", style: 0.6 },
      ],
      defaultStyle: 0
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
        [14.5, 2],
      ],
    },
  },
};
