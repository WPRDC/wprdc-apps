import { LayerOptions, SolidVisualProps } from "@/types/mapping";
import { epa } from "@/data/publishers";
import { Extent, GeoType, ColoringMode } from "@/types";

const layer: LayerOptions<SolidVisualProps> = {
  visualMode: ColoringMode.Solid,
  slug: "brownfields",
  title: "Brownfields",
  type: GeoType.Point,
  description:
    "EPA's Brownfields Program provides grants and technical assistance to communities, states, tribes and others to assess, safely clean up and sustainably reuse contaminated properties.",
  resourceID: "",
  publisher: epa,
  extent: Extent.County,
  popup: {
    title: "Brownfield",
    fields: [
      { field: "grant_recipient_name", label: "Grant Recipient Name" },
      { field: "type_of_funding", label: "Type of Funding" },
      { field: "current_owner", label: "Current Owner" },
    ],
  },
  source: { title: "", url: "" },
  color: "#80632d",
  // sql: "SELECT *, property_name as map_name, cartodb_id as map_identifier FROM brownfields",
};

export default layer;
