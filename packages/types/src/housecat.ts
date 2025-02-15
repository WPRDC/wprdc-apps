/** Primary index of housing projects **/

import { LayerProps, SourceProps } from "react-map-gl/maplibre";
import { LegendItemProps } from "./mapping";

export interface Resource<K extends string | number = string | number> {
  /** Backend primary key. May soon be deprecated as slug is available and servers as a global ID across WPRDC apps. */
  id: K;
  /** Name of the resource */
  name: string;
  /** Unique, human and machine-readable identifier */
  slug: string;
  /** Optional descriptive text */
  description?: string;
}

export interface WatchlistBrief extends Resource {
  userName: string;
  items: string[];
}

export interface Watchlist extends Resource {
  userName: string;
  projectIndices: ProjectIndex[];
}

export interface ProjectIndex extends Resource {
  id: number;
  url: string;
  propertyId?: string | null;
  hudPropertyName?: string | null;
  propertyStreetAddress?: string | null;
  municipalityName?: string | null;
  city?: string | null;
  zipCode?: string | null;
  units?: string | null;
  scatteredSites?: string | null;
  censusTract?: string | null;
  crowdsourcedId?: string | null;
  houseCatId?: string | null;
  status?: string | null;
  centroid?: [number, number];
  groups: string[];
  parcels: string[];
}

export interface ProjectIndexMapProperties {
  id: number;
  property_street_address?: string;
  census_tract?: string;
  latitude?: string;
  house_cat_id?: string;
  zip_code?: string;
  property_id?: string;
  city?: string;
  hud_property_name?: string;
  units?: string;
  scattered_sites: boolean;
  max_units?: number;
  funding_category?: string;
}

export interface ProjectIndexDetails extends ProjectIndex {
  maxUnits?: number;
  fundingCategory?: string;
  subsidyExpirationDate?: string;
  lihtcYearOfService?: number;
  reacScores?: Record<string, string>;

  activeHudMultifamilyInsuredMortgages: ActiveHUDMultifamilyInsuredMortgages[];
  hudMultifamilyFiscalYearProduction: HUDMultifamilyFiscalYearProduction[];
  lihtc: LIHTC[];
  allBuildingsFromLihtcProjects: AllBuildingsFromLIHTCProjects[];
  hudInspectionScores: HUDInspectionScores[];
  hudPublicHousingDevelopments: HUDPublicHousingDevelopments[];
  subsidyExtractHudInsuredMultifamilyProperties: SubsidyExtractHUDInsuredMultifamilyProperties[];
  subsidyExtractMultifamilyAssistanceAndSection8Contracts: SubsidyExtractMultifamilyAssistanceAndSection8Contracts[];
  multifamilyAssistanceAndSection8Contracts: MultifamilyAssistanceAndSection8Contracts[];
  hudInsuredMultifamilyProperties: HUDInsuredMultifamilyProperties[];
  hudMultifamilyInspectionScores: HUDMultifamilyInspectionScores[];
  lihtcDataFromPhfa: LIHTCDataFromPHFA[];
  demographicsByHousingProjectFromPhfa: DemographicsByHousingProjectFromPHFA[];
  phfaStats: PHFAStats[];
  longitude: string;
  latitude: string;
}

export interface ActiveHUDMultifamilyInsuredMortgages {
  fhaLoanId?: string | null;
  hudPropertyName?: string | null;
  propertyStreetAddress?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  units?: number | null;
  initialEndorsementDate?: string | null;
  originalMortgageAmount?: number | null;
  maturityDate?: string | null;
  termInMonths?: number | null;
  interestRate?: number | null;
  currentPrincipalAndInterest?: number | null;
  amoritizedPrincipalBalance?: number | null;
  holderName?: string | null;
  holderCity?: string | null;
  holderState?: string | null;
  servicerName?: string | null;
  servicerCity?: string | null;
  servicerState?: string | null;
  sectionOfActCode?: string | null;
  programCategory?: string | null;
}

export interface HUDMultifamilyFiscalYearProduction {
  fhaLoanId?: string | null;
  hudPropertyName?: string | null;
  city?: string | null;
  state?: string | null;
  initialEndorsementDate?: string | null;
  originalMortgageAmount?: number | null;
  programCategory?: string | null;
  units?: number | null;
  basicFhaRiskShareOrOther?: string | null;
  currentStatusOfLoan?: string | null;
  dateOfFirmIssue?: string | null;
  firmCommitmentLender?: string | null;
  holderName?: string | null;
}

export interface LIHTC {
  lihtcProjectId?: string | null;
  normalizedStateId?: string | null;
  censusTract?: string | null;
  censusTract2000?: string | null;
  countyFipsCode?: string | null;
  municipalityFips?: number | null;
  hudPropertyName?: string | null;
  propertyStreetAddress?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  units?: number | null;
  assistedUnits?: number | null;
  count0Br?: number | null;
  count1Br?: number | null;
  count2Br?: number | null;
  count3Br?: number | null;
  count4Br?: number | null;
  federalId?: string | null;
  stateId?: string | null;
  lihtcCredit?: string | null;
  lihtcConstructionType?: string | null;
  lihtcYearAllocated?: number | null;
  lihtcYearInService?: number | null;
  lihtcAmount?: string | null;
  fmha514Loan?: boolean | null;
  fmha515Loan?: boolean | null;
  fmha538Loan?: boolean | null;
  scatteredSiteInd?: string | null;
}

export interface AllBuildingsFromLIHTCProjects {
  lihtcProjectId?: string | null;
  normalizedStateId?: string | null;
  hudPropertyName?: string | null;
  propertyStreetAddress?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  stateId?: string | null;
}

export interface HUDInspectionScores {
  developmentCode?: string | null;
  state?: string | null;
  county?: string | null;
  countyFipsCode?: string | null;
  hudPropertyName?: string | null;
  propertyStreetAddress?: string | null;
  inspectionId?: number | null;
  inspectionPropertyIdMultiformat?: string | null;
  inspectionScore?: number | null;
  inspectionDate?: string | null;
  participantCode?: string | null;
  formalParticipantName?: string | null;
}

export interface HUDPublicHousingDevelopments {
  developmentCode?: string | null;
  geocodingAccuracy?: string | null;
  countyFipsCode?: string | null;
  censusTract?: string | null;
  municipalityFips?: string | null;
  municipalityName?: string | null;
  hudPropertyName?: string | null;
  propertyStreetAddress?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  units?: number | null;
  ownerOrganizationName?: string | null;
  participantCode?: string | null;
  formalParticipantName?: string | null;
  projectName?: string | null;
  totalDwellingUnits?: number | null;
  accUnits?: number | null;
  totalOccupied?: number | null;
  regularVacant?: number | null;
  phaTotalUnits?: number | null;
  percentOccupied?: string | null;
  peoplePerUnit?: number | null;
  peopleTotal?: number | null;
  rentPerMonth?: number | null;
  medianIncAmnt?: number | null;
  hhIncome?: number | null;
  personIncome?: number | null;
  pctLt5K?: number | null;
  pct5KLt10K?: number | null;
  pct10KLt15K?: number | null;
  pct15KLt20K?: number | null;
  pctGe20K?: number | null;
  pctLt80Median?: string | null;
  pctLt50Median?: number | null;
  pctLt30Median?: number | null;
  pctBed1?: number | null;
  pctBed2?: number | null;
  pctBed3?: number | null;
  pctOverhoused?: number | null;
  tminority?: string | null;
  tpoverty?: string | null;
  tpctOwnsfd?: string | null;
  chldrnMbrCnt?: number | null;
  eldlyPrcnt?: string | null;
  pctDisabledLt62All?: string | null;
  scatteredSiteInd?: string | null;
  pdStatusTypeCode?: string | null;
}

export interface HUDPublicHousingBuildings {
  developmentCode?: string | null;
  geocodingAccuracy?: string | null;
  countyFipsCode?: string | null;
  censusTract?: string | null;
  municipalityFips?: string | null;
  municipalityName?: string | null;
  hudPropertyName?: string | null;
  propertyStreetAddress?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  units?: number | null;
  ownerOrganizationName?: string | null;
  participantCode?: string | null;
  formalParticipantName?: string | null;
  projectName?: string | null;
  totalDwellingUnits?: number | null;
  accUnits?: number | null;
  totalOccupied?: number | null;
  regularVacant?: number | null;
  phaTotalUnits?: number | null;
  percentOccupied?: string | null;
  peoplePerUnit?: number | null;
  peopleTotal?: number | null;
  rentPerMonth?: number | null;
  medianIncAmnt?: number | null;
  hhIncome?: number | null;
  personIncome?: number | null;
  pctLt5K?: number | null;
  pct5KLt10K?: number | null;
  pct10KLt15K?: number | null;
  pct15KLt20K?: number | null;
  pctGe20K?: number | null;
  pctLt80Median?: string | null;
  pctLt50Median?: number | null;
  pctLt30Median?: number | null;
  pctBed1?: number | null;
  pctBed2?: number | null;
  pctBed3?: number | null;
  pctOverhoused?: number | null;
  tminority?: string | null;
  tpoverty?: string | null;
  tpctOwnsfd?: string | null;
  chldrnMbrCnt?: number | null;
  eldlyPrcnt?: string | null;
  pctDisabledLt62All?: string | null;
  nationalBuildingId?: string | null;
}

export interface SubsidyExtractHUDInsuredMultifamilyProperties {
  propertyId?: string | null;
  geocodingAccuracy?: string | null;
  county?: string | null;
  countyFipsCode?: string | null;
  congressionalDistrictCode?: string | null;
  censusTract?: string | null;
  municipalityFips?: string | null;
  municipalityName?: string | null;
  hudPropertyName?: string | null;
  propertyStreetAddress?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  units?: number | null;
  assistedUnits?: number | null;
  occupancyDate?: string | null;
  propertyCategoryName?: string | null;
  propertyManagerName?: string | null;
  propertyManagerCompany?: string | null;
  propertyManagerAddress?: string | null;
  propertyManagerPhone?: string | null;
  propertyManagerEmail?: string | null;
  contractId?: string | null;
  programType?: string | null;
  subsidyUnits?: number | null;
  subsidyExpirationDate?: string | null;
  count0Br?: number | null;
  count1Br?: number | null;
  count2Br?: number | null;
  count3Br?: number | null;
  count4Br?: number | null;
  count5Plusbr?: number | null;
  servicingSiteNameLoan?: string | null;
  inspectionId?: number | null;
  inspectionScore?: string | null;
  clientGroupName?: string | null;
  clientGroupType?: string | null;
}

export interface SubsidyExtractMultifamilyAssistanceAndSection8Contracts {
  propertyId?: string | null;
  countyFipsCode?: string | null;
  county?: string | null;
  congressionalDistrictCode?: string | null;
  municipalityName?: string | null;
  hudPropertyName?: string | null;
  propertyStreetAddress?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  units?: number | null;
  propertyCategoryName?: string | null;
  ownerOrganizationName?: string | null;
  ownerAddress?: string | null;
  ownerPhone?: string | null;
  ownerType?: string | null;
  ownerEffectiveDate?: string | null;
  ownerId?: number | null;
  propertyManagerName?: string | null;
  propertyManagerCompany?: string | null;
  propertyManagerAddress?: string | null;
  propertyManagerPhone?: string | null;
  propertyManagerEmail?: string | null;
  propertyManagerType?: string | null;
  servicingSiteName?: string | null;
}

export interface MultifamilyAssistanceAndSection8Contracts {
  propertyId?: string | null;
  hudPropertyName?: string | null;
  assistedUnits?: number | null;
  count0Br?: number | null;
  count1Br?: number | null;
  count2Br?: number | null;
  count3Br?: number | null;
  count4Br?: number | null;
  count5Plusbr?: number | null;
  contractId?: string | null;
  programType?: string | null;
  subsidyStartDate?: string | null;
  subsidyExpirationDate?: string | null;
  contractDurationMonths?: number | null;
}

export interface HUDInsuredMultifamilyProperties {
  propertyId?: string | null;
  fhaLoanId?: string | null;
  geocodingAccuracy?: string | null;
  county?: string | null;
  countyFipsCode?: string | null;
  congressionalDistrictCode?: string | null;
  censusTract?: string | null;
  municipalityFips?: string | null;
  municipalityName?: string | null;
  hudPropertyName?: string | null;
  propertyStreetAddress?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  units?: number | null;
  assistedUnits?: number | null;
  propertyCategoryName?: string | null;
  propertyManagerName?: string | null;
  propertyManagerPhone?: string | null;
  associatedFhaLoanId?: string | null;
  initialEndorsementDate?: string | null;
  originalMortgageAmount?: number | null;
  maturityDate?: string | null;
  programCategory?: string | null;
  programCategory2?: string | null;
  loanUnits?: number | null;
  clientGroupName?: string | null;
  clientGroupType?: string | null;
  sectionOfActCode?: string | null;
  servicingSiteNameLoan?: string | null;
}

export interface HUDMultifamilyInspectionScores {
  propertyId?: string | null;
  hudPropertyName?: string | null;
  inspectionPropertyIdMultiformat?: string | null;
  city?: string | null;
  state?: string | null;
  inspectionId?: string | null;
  inspectionScore?: string | null;
  inspectionDate?: string | null;
}

export interface LIHTCDataFromPHFA {
  pmindx?: string | null;
  hudPropertyName?: string | null;
  assistedUnits?: number | null;
  totalLihtcAllocation?: number | null;
  unitRestriction?: string | null;
  lihtcCredit?: string | null;
  lihtcYearAllocated?: number | null;
  lihtcYearInService?: number | null;
  lastYearOfRca?: number | null;
}

export interface DemographicsByHousingProjectFromPHFA {
  propertyId?: string | null;
  pmindx?: string | null;
  normalizedStateId?: string | null;
  fhaLoanId?: string | null;
  applicationNumber?: string | null;
  stateId?: string | null;
  contractId?: string | null;
  hudPropertyName?: string | null;
  propertyStreetAddress?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  ownerOrganizationName?: string | null;
  assistedUnits?: number | null;
  demographic?: string | null;
  physicalDisabilityHousing?: boolean | null;
  mentalDisabilityHousing?: boolean | null;
  homelessHousing?: boolean | null;
  ownerRepresentative?: string | null;
  propertyManagerCompany?: string | null;
  scatteredSites?: boolean | null;
}

export interface PHFAStats {
  pmindx?: number | null;
  hudPropertyName?: string | null;
  totalUnits?: number | null;
  count0Br?: number | null;
  count1Br?: number | null;
  count2Br?: number | null;
  count3Br?: number | null;
  count4Br?: number | null;
  count5Br?: number | null;
  count6Br?: number | null;
  plus1ManagerUnit?: number | null;
  number20PercentAmiLimit?: number | null;
  number30PercentAmiLimit?: number | null;
  number40PercentAmiLimit?: number | null;
  number50PercentAmiLimit?: number | null;
  number60PercentAmiLimit?: number | null;
  number80PercentAmiLimit?: number | null;
  marketRate?: number | null;
  otherIncomeLimit?: number | null;
  uncategorizedIncomeLimit?: number | null;
  unitsWSection811Subsidy?: number | null;
  unitsWSection8FairMarketRent?: number | null;
  unitsWHousingVouchers?: number | null;
  unitsWStaffUnit?: number | null;
  unitsWOtherSubsidyType?: number | null;
  unitsWProjectBasedSection8Certificate?: number | null;
  unitsWUncategorizedSubsidy?: number | null;
}

interface FHLBProperties {
  fhlbFundingId?: string | null;
  hudPropertyName?: string | null;
  applicationTypeName?: string | null;
  propertyStreetAddress?: string | null;
  city?: string | null;
  county?: string | null;
  state?: string | null;
  zipCode?: string | null;
  assistedUnits?: number | null;
  units?: number | null;
  retentionExpiration?: number | null;
  "50PercentAmiLimit"?: number | null;
  "60PercentAmiLimit"?: number | null;
  "80PercentAmiLimit"?: number | null;
  greaterThan80Ami?: number | null;
  latitude?: number | null;
  longitude?: number | null;
}

interface FHLBProjects {
  fhlbFundingId?: string | null;
  parcelCount?: string | null;
  hudPropertyName?: string | null;
  applicationTypeName?: string | null;
  addressLine1List?: string | null;
  propertyStreetAddress?: string | null;
  city?: string | null;
  county?: string | null;
  state?: string | null;
  zipCode?: string | null;
  "50PercentAmiLimit"?: number | null;
  "60PercentAmiLimit"?: number | null;
  "80PercentAmiLimit"?: number | null;
  greaterThan80Ami?: number | null;
  assistedUnits?: number | null;
  units?: number | null;
  retentionExpiration?: string | null;
  latitude?: number | null;
  longitude?: number | null;
}

export interface User {
  username: string;
  email: string;
  dateJoined: string;
}

export interface UserProfile {
  id: number;
  user: User;
  category: string;
  affiliation: string;
  intendedUse: string;
  expectedAccountTenure: string;
  conflicts: string;
  expirationDate: string;
  agreedToTerms: string;
  approved: string;
}

export interface APIMapBoxResponse {
  source: SourceProps;
  layers: LayerProps[];
  extras: {
    legendItems: LegendItemProps[];
  };
}
