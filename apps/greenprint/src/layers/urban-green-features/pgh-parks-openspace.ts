import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { pittsburgh } from "@/data/publishers.ts";

export const pghParksOpenspace: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "pgh-parks-openspace",
  title: "Open Space Plan",
  description: "City of Pittsburgh Open Space Plan",

  source: {
    slug: "pgh-parks-openspace",
    title: "City of Pittsburgh Open Space Plan",
    url: "", // TODO: fill in source url
    resourceID: "ce5d35a7-7ce5-42ac-b48f-719813a14870",
    publisher: pittsburgh,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.ce5d35a7-7ce5-42ac-b48f-719813a14870._geom",
    sourceLayer: "table.ce5d35a7-7ce5-42ac-b48f-719813a14870._geom",
  },

  extent: { label: "Pittsburgh", bbox: [0, 0, 0, 0] },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: {
      mode: "category",
      field: "plan",
      style: [
        { slug: "divest", label: "Divest", value: "divest", style: "#8DD3C7" },
        { slug: "invest", label: "Invest", value: "invest", style: "#FFFFB3" },
        {
          slug: "redevelop",
          label: "Redevelop",
          value: "redevelop",
          style: "#BEBADA",
        },
        { slug: "expand", label: "Expand", value: "expand", style: "#FB8072" },
        {
          slug: "naturalize",
          label: "Naturalize",
          value: "naturalize",
          style: "#80B1D3",
        },
      ],
    },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
