import { GeoType, LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { pittsburgh } from "@/data/publishers.ts";

export const cityOwned: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "city-owned",
  title: "City Owned Properties",
  description: "Properties owned by the City of Pittsburgh",

  source: {
    slug: "city-owned",
    title: "WPRDC - City-Owned Property",
    url: "https://data.wprdc.org/dataset/city-owned-property",
    resourceID: "e1dcee82-9179-4306-8167-5891915b62a7",
    publisher: pittsburgh,
  },

  tiles: {
    source: "https://data.wprdc.org/tiles/table.city_owned.geom",
    sourceLayer: "table.city_owned.geom",
  },

  extent: { label: "Pittsburgh", bbox: [0, 0, 0, 0] },
  legend: {
    geoType: GeoType.Polygon,
    slug: "city-owned",
    title: "City-Owned Properties",
    type: "fixed",
    style: { fillColor: "#BF00FF", fillOpacity: 0.8, strokeColor: "#000" },
    label: "City-Owned Properties",
  },
  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: { mode: "fixed", style: "#BF00FF" },
    fillOpacity: { mode: "fixed", style: 0.2 },
    strokeColor: { mode: "fixed", style: "#BF00FF" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
