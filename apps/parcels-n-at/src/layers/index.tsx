import { largeParcelPortfolios } from "./large-parcel-portfolios";
import { pittsburghNeighborhoods } from "./pittsburgh-neighborhoods";
import { municipalities } from "./municipalities";
import { pittsburghBoundary } from "./pittsburgh-boundary";
import { alleghenyCountyBoundary } from "./allegheny-county-boundary";
import { parcelUseClasses } from "@/layers/parcel-use-classes-sc";
import { vacantParcels } from "@/layers/vacant-parcels";

export const availableLayers = [
  parcelUseClasses,
  alleghenyCountyBoundary,
  pittsburghBoundary,
  municipalities,
  pittsburghNeighborhoods,
  largeParcelPortfolios,
  vacantParcels
];