import { pittsburghNeighborhoods } from "./pittsburgh-neighborhoods";
import { municipalities } from "./municipalities";
import { pittsburghBoundary } from "./pittsburgh-boundary";
import { alleghenyCountyBoundary } from "./allegheny-county-boundary";
import { parcelUseClasses } from "@/layers/parcel-use-classes-sc";
import { vacantParcels } from "@/layers/vacant-parcels";
import { largeInstitutionalOwners } from "@/layers/large-institutional-owners";
import { largePublicOwners } from "@/layers/large-public-owners";

export const availableLayers = [
  parcelUseClasses,
  alleghenyCountyBoundary,
  pittsburghBoundary,
  municipalities,
  pittsburghNeighborhoods,
  largeInstitutionalOwners,
  largePublicOwners,
  vacantParcels,
];