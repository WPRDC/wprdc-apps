/*
 * Default map layer settings for polygon layers
 */

import type { LayerConfig, SolidSymbologyProps } from "@wprdc/types";
import { GeoType, SymbologyMode } from "@wprdc/types";

export const defaultPointLayer: LayerConfig<SolidSymbologyProps> = {
  slug: "",
  title: "",
  description: "",
  symbologyMode: SymbologyMode.Solid,
  type: GeoType.Polygon,
  publisher: {
    name: "Allegheny County",
    homepage: "https://www.alleghenycounty.us/",
    org: "allegheny-county",
  },
  source: {
    slug: "parcels",
    title: "Allegheny County Parcel Boundaries",
    url: "https://data.wprdc.org/dataset/allegheny-county-parcel-boundaries1",
    resourceID: "3f50d47a-ab54-4da2-9f03-8519006e9fc9",
  },

  tileSource: {
    tileJSONSource: "https://data.wprdc.org/tiles/table.parcel_index.geom",
    sourceLayer: "table.parcel_index.geom",
    minZoom: 15,
  },

  symbology: {
    color: "#000",
    opacity: [
      [16, 0.95],
      [18, 0.75],
    ],
    borderColor: "#000",
    borderOpacity: [[16, 1]],

    // textField: ["get", ""],
    // textSize: [
    //   [16, 6],
    //   [16.5, 10],
    //   [17.5, 10],
    //   [21, 18],
    // ],
  },

  renderOptions: {
    noLegend: true,
  },
};
