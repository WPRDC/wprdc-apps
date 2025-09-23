import { pittsburghNeighborhoods } from "./pittsburgh-neighborhoods";
import { municipalities } from "./municipalities";
import { pittsburghBoundary } from "./pittsburgh-boundary";
import { alleghenyCountyBoundary } from "./allegheny-county-boundary";
import { parcelUseClasses } from "@/layers/parcel-use-classes-sc";
import { vacantParcels } from "@/layers/vacant-parcels";
import { largeInstitutionalOwners } from "@/layers/large-institutional-owners";
import { largePublicOwners } from "@/layers/large-public-owners";
import {countyMVA} from "@/layers/ac-mva";
import {pittsburghHOLC} from "@/layers/pittsburgh-holc";
import {pre78parcels} from "@/layers/pre-78-parcels";
import {waterSuppliers} from '@/layers/water-suppliers.ts'
import { parcelLeadlineStatus } from "@/layers/parcel-leadline-status.ts";

export const availableLayers = [
  parcelUseClasses,
  vacantParcels,
  municipalities,
  pittsburghNeighborhoods,
  countyMVA,
  pittsburghHOLC,

  alleghenyCountyBoundary,
  pittsburghBoundary,

  pre78parcels,
  waterSuppliers,
  parcelLeadlineStatus,
  // largeInstitutionalOwners,
  // largePublicOwners,
];