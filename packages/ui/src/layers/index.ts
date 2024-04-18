import { pittsburghNeighborhoodLayer } from "./pittsburgh-neighborhoods";
import { parcelLayer } from "./parcels";
import { municipalities } from "./municipalities";
import { pittsburghBoundary } from "./pittsburgh-boundary";
import { alleghenyCountyBoundary } from "./allegheny-county-boundary";

export * from "./pittsburgh-neighborhoods";
export * from "./parcels";
export * from "./municipalities";
export * from "./pittsburgh-boundary";
export * from "./allegheny-county-boundary";

export const dataLayers = {
  "pittsburgh-neighborhoods": pittsburghNeighborhoodLayer,
  parcels: parcelLayer,
  "allegheny-county-municipalities": municipalities,
  "pittsburgh-boundary": pittsburghBoundary,
  "allegheny-county-boundary": alleghenyCountyBoundary,
};

export type LayerSlug = keyof typeof dataLayers;
