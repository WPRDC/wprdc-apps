import { SourceProps } from "react-map-gl";

/** Generate  */
function makeSource(
  slug: string,
  resource_id: string,
  attribution: string,
): SourceProps {
  return {
    id: slug,
    attribution,
    type: "vector",
    url: `https://data.wprdc.org/tiles/catalog/table.public.${resource_id}._geom.`,
  };
}
