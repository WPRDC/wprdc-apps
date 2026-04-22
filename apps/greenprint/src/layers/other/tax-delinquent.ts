import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { pittsburgh } from "@/data/publishers.ts";

export const taxDelinquent: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "tax-delinquent",
  title: "Tax Delinquent",
  description: "Properties that have been tax delinquent for more than 1 year.",

  source: {
    slug: "tax-delinquent",
    title: "WPRDC - City of Pittsburgh Property Tax Delinquency",
    url: "https://data.wprdc.org/dataset/city-of-pittsburgh-property-tax-delinquency",
    resourceID: "ed0d1550-c300-4114-865c-82dc7c23235b",
    publisher: pittsburgh,
  },

  tiles: {
    source: "https://data.wprdc.org/tiles/table.tax_delinquent.geom",
    sourceLayer: "table.tax_delinquent.geom",
    minZoom: 10,
  },

  extent: { label: "Pittsburgh", bbox: [0, 0, 0, 0] },
  legend: {
    geoType: GeoType.Polygon,
    slug: "delinquent",
    title: "Tax Delinquent Properties",
    type: "fixed",
    style: { fillColor: "#0011F5", fillOpacity: 0.8, strokeColor: "#000" },
    label: "Tax Delinquent Properties",
  },
  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: { mode: "fixed", style: "#0011F5" },
    fillOpacity: {
      mode: "expression",
      expression: [
        "interpolate",
        ["exponential", 0.5],
        ["zoom"],
        0,
        0,
        10,
        0.2,
        16.5,
        0.5,
      ],
    },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
    strokeOpacity: {
      mode: "expression",
      expression: [
        "interpolate",
        ["exponential", 0.5],
        ["zoom"],
        0,
        0,
        12,
        0.1,
        16.5,
        0.7,
      ],
    },
  },
};
