import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { pwsa } from "@/data/publishers.ts";

export const pwsaGiConcept: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "pwsa-gi-concept",
  title: "Green First Plan",
  description:
    "Identifies opportunity sites throughout various sewersheds for stormwater infrastructure that could fulfill both stormwater management needs and support healthy communities and neighborhoods.",

  source: {
    slug: "pwsa-gi-concept",
    title: "WPRDC - A42-M29-M16 Green Infrastructure Concept",
    url: "https://data.wprdc.org/dataset/a42-m29-m16-gi-concept",
    resourceID: "fdb9f4c1-b9ce-4361-812d-9c9fa7e740d7",
    publisher: pwsa,
  },

  tiles: {
    source: "https://data.wprdc.org/tiles/table.pwsa_green_first_plan._geom",
    sourceLayer: "table.pwsa_green_first_plan._geom",
  },

  extent: { label: "Pittsburgh", bbox: [0, 0, 0, 0] },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: {
      mode: "category",
      field: "type",
      style: [
        {
          slug: "p-detention",
          label: "Detention",
          value: "p-detention",
          style: "#0000FF",
        },
        {
          slug: "p-bioswale",
          label: "Bioswale",
          value: "p-bioswale",
          style: "#008000",
        },
        {
          slug: "p-pervious",
          label: "Pervious",
          value: "p-pervious",
          style: "#FF0000",
        },
        {
          slug: "p-retention",
          label: "Retention",
          value: "p-retention",
          style: "#000080",
        },
      ],
    },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
