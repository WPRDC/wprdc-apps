import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { alleghenyCounty } from "@/data/publishers.ts";

export const alleghenyLandUseAreas: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "allegheny-land-use-areas",
  title: "Land Use",
  description: "Allegheny County land use as ascribed to areas of land.",

  source: {
    slug: "allegheny-land-use-areas",
    title: "WPRDC - Allegheny County Land Use Areas",
    url: "https://data.wprdc.org/dataset/allegheny-county-land-use-areas",
    resourceID: "e5f9adda-fd3c-434f-ae7b-429929451c90",
    publisher: alleghenyCounty,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.e5f9adda-fd3c-434f-ae7b-429929451c90._geom",
    sourceLayer: "table.e5f9adda-fd3c-434f-ae7b-429929451c90._geom",
  },
  extent: {
    label: "Allegheny County",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: {
      mode: "category",
      field: "FEATURECOD",
      style: [
        {
          slug: "300",
          label: "Uncoded Land Area",
          value: "300",
          style: "#0000FF",
        },
        { slug: "310", label: "Woodland", value: "310", style: "#008000" },
        {
          slug: "340",
          label: "Nursery or Orchard",
          value: "340",
          style: "#FF0000",
        },
        {
          slug: "350",
          label: "Cultivated Field",
          value: "350",
          style: "#800080",
        },
        {
          slug: "620",
          label: "Athletic Field",
          value: "620",
          style: "#FFFF00",
        },
      ],
    },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
