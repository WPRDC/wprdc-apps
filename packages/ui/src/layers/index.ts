import { alleghenyCountyBoundary } from "./allegheny-county-boundary";
import { municipalities } from "./municipalities";
import { parcelLayer } from "./parcels";
import { pittsburghBoundary } from "./pittsburgh-boundary";
import { pittsburghNeighborhoodLayer } from "./pittsburgh-neighborhoods";

export * from "./pittsburgh-neighborhoods";
export * from "./parcels";
export * from "./municipalities";
export * from "./pittsburgh-boundary";
export * from "./allegheny-county-boundary";

export const dataLayers = {
  parcels: parcelLayer,
  "pittsburgh-neighborhoods": pittsburghNeighborhoodLayer,
  "allegheny-county-municipalities": municipalities,
  "pittsburgh-boundary": pittsburghBoundary,
  "allegheny-county-boundary": alleghenyCountyBoundary,
};

export type LayerSlug = keyof typeof dataLayers;
