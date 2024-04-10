import type { LayerConfig, SolidSymbologyProps } from "@wprdc/types";
import { GeoType, SymbologyMode } from "@wprdc/types";

export const pittsburghBoundary: LayerConfig<SolidSymbologyProps> = {
  slug: "pittsburgh-boundary",
  title: "Pittsburgh Boundary",
  description: "Boundary of the City of Pittsburgh",

  symbologyMode: SymbologyMode.Solid,
  type: GeoType.Polygon,
  extent: "Pittsburgh",
  noLegend: true,

  publisher: {
    name: "City of Pittsburgh",
    homepage: "http://www.pittsburghpa.gov/",
    org: "city-of-pittsburgh",
  },
  source: {
    slug: "pittsburgh-border",
    title: "Pittsburgh City Boundary",
    url: "https://data.wprdc.org/dataset/pittsburgh-city-boundary",
    resourceID: "11af0bf9-2d04-4e71-b28c-a0dfb3078080",
  },
  tileJSONSource: "https://data.wprdc.org/tiles/municipalities",
  sourceLayer: "b0cb0249-d1ba-45b7-9918-dc86fa8af04c",
  filter: ["==", "NAME", "PITTSBURGH"],

  color: "#000",
  borderColor: "#000",
  opacity: 0,
  borderWidth: 4,
};
