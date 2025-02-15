import {
  ActiveHUDMultifamilyInsuredMortgages,
  AllBuildingsFromLIHTCProjects,
  DemographicsByHousingProjectFromPHFA,
  HUDInspectionScores,
  HUDInsuredMultifamilyProperties,
  HUDMultifamilyFiscalYearProduction,
  HUDMultifamilyInspectionScores,
  HUDPublicHousingBuildings,
  HUDPublicHousingDevelopments,
  LIHTC,
  LIHTCDataFromPHFA,
  MultifamilyAssistanceAndSection8Contracts,
  PHFAStats,
  ProjectIndexDetails,
  SubsidyExtractHUDInsuredMultifamilyProperties,
  SubsidyExtractMultifamilyAssistanceAndSection8Contracts,
} from "@wprdc/types";

export interface SchemaItem<T> {
  accessor: keyof T | ((item: T) => React.ReactNode);
  label: string;
  format?: "date" | "money" | "percent" | "string";
}

export interface SchemaSection<T> {
  title: string;
  items: SchemaItem<T>[];
}

export type SectionTypes =
  | ActiveHUDMultifamilyInsuredMortgages
  | HUDMultifamilyFiscalYearProduction
  | LIHTC
  | AllBuildingsFromLIHTCProjects
  | HUDInspectionScores
  | HUDPublicHousingDevelopments
  | HUDPublicHousingBuildings
  | SubsidyExtractHUDInsuredMultifamilyProperties
  | SubsidyExtractMultifamilyAssistanceAndSection8Contracts
  | MultifamilyAssistanceAndSection8Contracts
  | HUDInsuredMultifamilyProperties
  | HUDMultifamilyInspectionScores
  | LIHTCDataFromPHFA
  | DemographicsByHousingProjectFromPHFA
  | PHFAStats;

type IgnoredFields =
  | "id"
  | "slug"
  | "name"
  | "description"
  | "propertyId"
  | "hudPropertyName"
  | "propertyStreetAddress"
  | "municipalityName"
  | "city"
  | "zipCode"
  | "units"
  | "scatteredSites"
  | "censusTract"
  | "crowdsourcedId"
  | "houseCatId"
  | "status"
  | "url"
  | "centroid"
  | "maxUnits"
  | "fundingCategory"
  | "subsidyExpirationDate"
  | "lihtcYearOfService"
  | "reacScores";

export type ComplexItems = Omit<ProjectIndexDetails, IgnoredFields>;

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

export interface Project
  extends Record<keyof ComplexItems, SchemaSection<any>> {
  activeHudMultifamilyInsuredMortgages: SchemaSection<ActiveHUDMultifamilyInsuredMortgages>;
  hudMultifamilyFiscalYearProduction: SchemaSection<HUDMultifamilyFiscalYearProduction>;
  lihtc: SchemaSection<LIHTC>;
  allBuildingsFromLihtcProjects: SchemaSection<AllBuildingsFromLIHTCProjects>;
  hudInspectionScores: SchemaSection<HUDInspectionScores>;
  hudPublicHousingDevelopments: SchemaSection<HUDPublicHousingDevelopments>;
  subsidyExtractHudInsuredMultifamilyProperties: SchemaSection<SubsidyExtractHUDInsuredMultifamilyProperties>;
  subsidyExtractMultifamilyAssistanceAndSection8Contracts: SchemaSection<SubsidyExtractMultifamilyAssistanceAndSection8Contracts>;
  multifamilyAssistanceAndSection8Contracts: SchemaSection<MultifamilyAssistanceAndSection8Contracts>;
  hudInsuredMultifamilyProperties: SchemaSection<HUDInsuredMultifamilyProperties>;
  hudMultifamilyInspectionScores: SchemaSection<HUDMultifamilyInspectionScores>;
  lihtcDataFromPhfa: SchemaSection<LIHTCDataFromPHFA>;
  demographicsByHousingProjectFromPhfa: SchemaSection<DemographicsByHousingProjectFromPHFA>;
  phfaStats: SchemaSection<PHFAStats>;
  fhlbProperties: SchemaSection<FHLBProperties>;
  fhlbProjects: SchemaSection<FHLBProjects>;
}

export const affordableHousingSchema: Omit<
  Project,
  "latitude" | "longitude" | "groups" | "parcels"
> = {
  activeHudMultifamilyInsuredMortgages: {
    title: "Active HUD Multifamily Insured Mortgages",
    items: [
      {
        accessor: "fhaLoanId",
        label: "FHA Loan ID",
        format: "string",
      },
      {
        accessor: "units",
        label: "Units",
      },
      {
        accessor: "initialEndorsementDate",
        label: "Initial Endorsement Date",
        format: "date",
      },
      {
        accessor: "originalMortgageAmount",
        label: "Original Mortgage Amount",
        format: "money",
      },
      {
        accessor: "maturityDate",
        label: "Maturity Date",
        format: "date",
      },
      {
        accessor: "termInMonths",
        label: "Term (in months)",
      },
      {
        accessor: "interestRate",
        label: "Interest Rate",
        format: "percent",
      },
      {
        accessor: "currentPrincipalAndInterest",
        label: "Current Principal and Interest",
      },
      {
        accessor: "sectionOfActCode",
        label: "Section of ACT Code",
        format: "string",
      },
      {
        accessor: "programCategory",
        label: "Program Category",
        format: "string",
      },
      {
        accessor: "amoritizedPrincipalBalance",
        label: "FHA Loan ID",
        format: "string",
      },
      {
        accessor: "holderName",
        label: "Holder Name",
        format: "string",
      },
      {
        accessor: ({ holderCity, holderState }) =>
          `${holderCity}, ${holderState}`,
        label: "Holder Location",
        format: "string",
      },
      {
        accessor: "servicerName",
        label: "Servicer Name",
        format: "string",
      },
      {
        accessor: ({ servicerCity, servicerState }) =>
          `${servicerCity}, ${servicerState}`,
        label: "Servicer Location",
        format: "string",
      },
    ],
  },
  hudMultifamilyFiscalYearProduction: {
    title: "HUD Multifamily Fiscal Year Production",
    items: [
      {
        accessor: "fhaLoanId",
        label: "FHA Loan ID",
        format: "string",
      },
      {
        accessor: "units",
        label: "Units",
      },
      {
        accessor: "initialEndorsementDate",
        label: "Initial Endorsement Date",
        format: "date",
      },
      {
        accessor: "originalMortgageAmount",
        label: "Original Mortgage Amount",
        format: "money",
      },
      {
        accessor: "basicFhaRiskShareOrOther",
        label: "Risk Share",
        format: "string",
      },
      {
        accessor: "currentStatusOfLoan",
        label: "Current Loan Status",
        format: "string",
      },
      {
        accessor: "dateOfFirmIssue",
        label: "Date of Firm Issue",
        format: "date",
      },
      {
        accessor: "programCategory",
        label: "Program Category",
        format: "string",
      },
      {
        accessor: "holderName",
        label: "Holder Name",
        format: "string",
      },
      {
        accessor: "firmCommitmentLender",
        label: "Form Commitment Lender",
        format: "string",
      },
    ],
  },
  lihtc: {
    title: "LIHTC",
    items: [
      {
        accessor: "lihtcProjectId",
        label: "LIHTC Project ID",
        format: "string",
      },
      { accessor: "normalizedStateId", label: "State ID", format: "string" },
      { accessor: "federalId", label: "Federal ID", format: "string" },
      { accessor: "stateId", label: "State ID", format: "string" },
      { accessor: "units", label: "Units" },
      { accessor: "assistedUnits", label: "Assisted Units" },
      { accessor: "count0Br", label: "No. 0-Br" },
      { accessor: "count1Br", label: "No. 1-Br" },
      { accessor: "count2Br", label: "No. 2-Br" },
      { accessor: "count3Br", label: "No. 3-Br" },
      { accessor: "count4Br", label: "No. 4-Br" },

      { accessor: "lihtcCredit", label: "LIHTC Credit" },
      {
        accessor: "lihtcConstructionType",
        label: "Construction Type",
        format: "string",
      },
      { accessor: "lihtcYearAllocated", label: "Year Allocated" },
      { accessor: "lihtcYearInService", label: "Year in Service" },
      { accessor: "lihtcAmount", label: "LIHTC Amount", format: "money" },
      { accessor: "fmha514Loan", label: "FMHA 514 Loan" },
      { accessor: "fmha515Loan", label: "FMHA 515 Loan" },
      { accessor: "fmha538Loan", label: "FMHA 538 Loan" },
      { accessor: "scatteredSiteInd", label: "Has Scattered Sites" },
    ],
  },
  allBuildingsFromLihtcProjects: {
    title: "All Buildings From LIHTC Projects",
    items: [
      { accessor: "lihtcProjectId", label: "LIHTC Project ID" },
      { accessor: "normalizedStateId", label: "Normalized State ID" },
      { accessor: "hudPropertyName", label: "HUD Property Name" },
    ],
  },
  hudInspectionScores: {
    title: "Hud Inspection Scores",
    items: [
      { accessor: "developmentCode", label: "Development Code" },
      { accessor: "inspectionId", label: "Inspection Id" },
      {
        accessor: "inspectionPropertyIdMultiformat",
        label: "Inspection Property Id Multiformat",
      },
      { accessor: "inspectionScore", label: "Inspection Score" },
      { accessor: "inspectionDate", label: "Inspection Date", format: "date" },
      { accessor: "participantCode", label: "Participant Code" },
      { accessor: "formalParticipantName", label: "Formal Participant Name" },
    ],
  },
  hudPublicHousingDevelopments: {
    title: "Hud Public Housing Developments",
    items: [
      { accessor: "developmentCode", label: "Development Code" },
      { accessor: "units", label: "Units" },
      { accessor: "ownerOrganizationName", label: "Owner Organization Name" },
      { accessor: "participantCode", label: "Participant Code" },
      { accessor: "formalParticipantName", label: "Formal Participant Name" },
      { accessor: "projectName", label: "Project Name" },
      { accessor: "totalDwellingUnits", label: "Total Dwelling Units" },
      { accessor: "accUnits", label: "Acc Units" },
      { accessor: "totalOccupied", label: "Total Occupied" },
      { accessor: "regularVacant", label: "Regular Vacant" },
      { accessor: "phaTotalUnits", label: "Pha Total Units" },
      { accessor: "percentOccupied", label: "Percent Occupied" },
      { accessor: "peoplePerUnit", label: "People Per Unit" },
      { accessor: "peopleTotal", label: "People Total" },
      { accessor: "rentPerMonth", label: "Rent Per Month", format: "money" },
      { accessor: "medianIncAmnt", label: "Median Inc Amnt" },
      { accessor: "hhIncome", label: "Hh Income" },
      { accessor: "personIncome", label: "Person Income" },
      { accessor: "pctLt5K", label: "% < 5 K" },
      { accessor: "pct5KLt10K", label: "% 5 K < 10 K" },
      { accessor: "pct10KLt15K", label: "% 10 K < 15 K" },
      { accessor: "pct15KLt20K", label: "% 15 K < 20 K" },
      { accessor: "pctGe20K", label: "% Ge 20 K" },
      { accessor: "pctLt80Median", label: "% < 80 Median" },
      { accessor: "pctLt50Median", label: "% < 50 Median" },
      { accessor: "pctLt30Median", label: "% < 30 Median" },
      { accessor: "pctBed1", label: "% Bed 1" },
      { accessor: "pctBed2", label: "% Bed 2" },
      { accessor: "pctBed3", label: "% Bed 3" },
      { accessor: "pctOverhoused", label: "% Overhoused" },
      { accessor: "tminority", label: "Tminority" },
      { accessor: "tpoverty", label: "Tpoverty" },
      { accessor: "tpctOwnsfd", label: "Tpct Ownsfd" },
      { accessor: "chldrnMbrCnt", label: "Chldrn Mbr Cnt" },
      { accessor: "eldlyPrcnt", label: "% Elderly" },
      { accessor: "pctDisabledLt62All", label: "% Disabled < 62 All" },
      { accessor: "scatteredSiteInd", label: "Scattered Site Ind" },
      { accessor: "pdStatusTypeCode", label: "Pd Status Type Code" },
    ],
  },
  subsidyExtractHudInsuredMultifamilyProperties: {
    title: "Subsidy Extract Hud Insured Multifamily Properties",
    items: [
      { accessor: "propertyId", label: "Property Id" },
      { accessor: "units", label: "Units" },
      { accessor: "assistedUnits", label: "Assisted Units" },
      { accessor: "occupancyDate", label: "Occupancy Date" },
      { accessor: "propertyCategoryName", label: "Property Category Name" },
      { accessor: "propertyManagerName", label: "Property Manager Name" },
      { accessor: "propertyManagerCompany", label: "Property Manager Company" },
      { accessor: "propertyManagerAddress", label: "Property Manager Address" },
      { accessor: "propertyManagerPhone", label: "Property Manager Phone" },
      { accessor: "propertyManagerEmail", label: "Property Manager Email" },
      { accessor: "contractId", label: "Contract Id" },
      { accessor: "programType", label: "Program Type" },
      { accessor: "subsidyUnits", label: "Subsidy Units" },
      { accessor: "subsidyExpirationDate", label: "Subsidy Expiration Date" },
      { accessor: "count0Br", label: "# 0-Br" },
      { accessor: "count1Br", label: "# 1-Br" },
      { accessor: "count2Br", label: "# 2-Br" },
      { accessor: "count3Br", label: "# 3-Br" },
      { accessor: "count4Br", label: "# 4-Br" },
      { accessor: "count5Plusbr", label: "# 5-Br+" },
      { accessor: "servicingSiteNameLoan", label: "Servicing Site Name Loan" },
      { accessor: "inspectionId", label: "Inspection Id" },
      { accessor: "inspectionScore", label: "Inspection Score" },
      { accessor: "clientGroupName", label: "Client Group Name" },
      { accessor: "clientGroupType", label: "Client Group Type" },
    ],
  },
  subsidyExtractMultifamilyAssistanceAndSection8Contracts: {
    title: "Subsidy Extract Multifamily Assistance And Section 8 Contracts",
    items: [
      { accessor: "propertyId", label: "Property ID" },
      { accessor: "units", label: "Units" },
      { accessor: "propertyCategoryName", label: "Property Category Name" },
      { accessor: "ownerOrganizationName", label: "Owner Organization Name" },
      { accessor: "ownerAddress", label: "Owner Address" },
      { accessor: "ownerPhone", label: "Owner Phone" },
      { accessor: "ownerType", label: "Owner Type" },
      { accessor: "ownerEffectiveDate", label: "Owner Effective Date" },
      { accessor: "ownerId", label: "Owner Id" },
      { accessor: "propertyManagerName", label: "Property Manager Name" },
      { accessor: "propertyManagerCompany", label: "Property Manager Company" },
      { accessor: "propertyManagerAddress", label: "Property Manager Address" },
      { accessor: "propertyManagerPhone", label: "Property Manager Phone" },
      { accessor: "propertyManagerEmail", label: "Property Manager Email" },
      { accessor: "propertyManagerType", label: "Property Manager Type" },
      { accessor: "servicingSiteName", label: "Servicing Site Name" },
    ],
  },
  multifamilyAssistanceAndSection8Contracts: {
    title: "Multifamily Assistance And Section 8 Contracts",
    items: [
      { accessor: "propertyId", label: "Property Id" },
      { accessor: "hudPropertyName", label: "Hud Property Name" },
      { accessor: "assistedUnits", label: "Assisted Units" },
      { accessor: "count0Br", label: "# 0-Br" },
      { accessor: "count1Br", label: "# 1-Br" },
      { accessor: "count2Br", label: "# 2-Br" },
      { accessor: "count3Br", label: "# 3-Br" },
      { accessor: "count4Br", label: "# 4-Br" },
      { accessor: "count5Plusbr", label: "# 5-Br+" },
      { accessor: "contractId", label: "Contract Id" },
      { accessor: "programType", label: "Program Type" },
      { accessor: "subsidyStartDate", label: "Subsidy Start Date" },
      { accessor: "subsidyExpirationDate", label: "Subsidy Expiration Date" },
      { accessor: "contractDurationMonths", label: "Contract Duration Months" },
    ],
  },
  hudInsuredMultifamilyProperties: {
    title: "HUD Insured Multifamily Properties",
    items: [
      { accessor: "propertyId", label: "Property Id" },
      { accessor: "fhaLoanId", label: "Fha Loan Id" },
      { accessor: "units", label: "Units" },
      { accessor: "assistedUnits", label: "Assisted Units" },
      { accessor: "propertyCategoryName", label: "Property Category Name" },
      { accessor: "propertyManagerName", label: "Property Manager Name" },
      { accessor: "propertyManagerPhone", label: "Property Manager Phone" },
      { accessor: "associatedFhaLoanId", label: "Associated Fha Loan Id" },
      { accessor: "initialEndorsementDate", label: "Initial Endorsement Date" },
      { accessor: "originalMortgageAmount", label: "Original Mortgage Amount" },
      { accessor: "maturityDate", label: "Maturity Date" },
      { accessor: "programCategory", label: "Program Category" },
      { accessor: "programCategory2", label: "Program Category 2" },
      { accessor: "loanUnits", label: "Loan Units" },
      { accessor: "clientGroupName", label: "Client Group Name" },
      { accessor: "clientGroupType", label: "Client Group Type" },
      { accessor: "sectionOfActCode", label: "Section Of Act Code" },
      { accessor: "servicingSiteNameLoan", label: "Servicing Site Name Loan" },
    ],
  },
  hudMultifamilyInspectionScores: {
    title: "HUD Multifamily Inspection Scores",
    items: [
      { accessor: "propertyId", label: "Property Id" },
      { accessor: "hudPropertyName", label: "Hud Property Name" },
      {
        accessor: "inspectionPropertyIdMultiformat",
        label: "Inspection Property Id Multiformat",
      },
      { accessor: "inspectionId", label: "Inspection Id" },
      { accessor: "inspectionScore", label: "Inspection Score" },
      { accessor: "inspectionDate", label: "Inspection Date" },
    ],
  },
  lihtcDataFromPhfa: {
    title: "LIHTC Data From PHFA",
    items: [
      { accessor: "pmindx", label: "Pmindx" },
      { accessor: "hudPropertyName", label: "HUD Property Name" },
      { accessor: "assistedUnits", label: "Assisted Units" },
      { accessor: "totalLihtcAllocation", label: "Total LIHTC Allocation" },
      { accessor: "unitRestriction", label: "Unit Restriction" },
      { accessor: "lihtcCredit", label: "Lihtc Credit" },
      { accessor: "lihtcYearAllocated", label: "Lihtc Year Allocated" },
      { accessor: "lihtcYearInService", label: "Lihtc Year In Service" },
      { accessor: "lastYearOfRca", label: "Last Year Of RCA" },
    ],
  },
  demographicsByHousingProjectFromPhfa: {
    title: "Demographics By Housing Project From PHFA",
    items: [
      { accessor: "propertyId", label: "Property ID" },
      { accessor: "pmindx", label: "Pmindx" },
      { accessor: "normalizedStateId", label: "Normalized State ID" },
      { accessor: "fhaLoanId", label: "Fha Loan ID" },
      { accessor: "applicationNumber", label: "Application Number" },
      { accessor: "stateId", label: "State ID" },
      { accessor: "contractId", label: "Contract ID" },
      { accessor: "hudPropertyName", label: "Hud Property Name" },
      { accessor: "ownerOrganizationName", label: "Owner Organization Name" },
      { accessor: "assistedUnits", label: "Assisted Units" },
      { accessor: "demographic", label: "Demographic" },
      {
        accessor: "physicalDisabilityHousing",
        label: "Physical Disability Housing",
      },
      {
        accessor: "mentalDisabilityHousing",
        label: "Mental Disability Housing",
      },
      { accessor: "homelessHousing", label: "Homeless Housing" },
      { accessor: "ownerRepresentative", label: "Owner Representative" },
      { accessor: "propertyManagerCompany", label: "Property Manager Company" },
      { accessor: "scatteredSites", label: "Scattered Sites" },
    ],
  },
  phfaStats: {
    title: "PHFA Stats",
    items: [
      { accessor: "pmindx", label: "Pmindx" },
      { accessor: "hudPropertyName", label: "Hud Property Name" },
      { accessor: "totalUnits", label: "Total Units" },
      { accessor: "count0Br", label: "Count 0 Br" },
      { accessor: "count1Br", label: "Count 1 Br" },
      { accessor: "count2Br", label: "Count 2 Br" },
      { accessor: "count3Br", label: "Count 3 Br" },
      { accessor: "count4Br", label: "Count 4 Br" },
      { accessor: "count5Br", label: "Count 5 Br" },
      { accessor: "count6Br", label: "Count 6 Br" },
      { accessor: "plus1ManagerUnit", label: "Plus 1 Manager Unit" },
      {
        accessor: "number20PercentAmiLimit",
        label: "Number 20 Percent AMI Limit",
      },
      {
        accessor: "number30PercentAmiLimit",
        label: "Number 30 Percent AMI Limit",
      },
      {
        accessor: "number40PercentAmiLimit",
        label: "Number 40 Percent AMI Limit",
      },
      {
        accessor: "number50PercentAmiLimit",
        label: "Number 50 Percent AMI Limit",
      },
      {
        accessor: "number60PercentAmiLimit",
        label: "Number 60 Percent AMI Limit",
      },
      {
        accessor: "number80PercentAmiLimit",
        label: "Number 80 Percent AMI Limit",
      },
      { accessor: "marketRate", label: "Market Rate" },
      { accessor: "otherIncomeLimit", label: "Other Income Limit" },
      {
        accessor: "uncategorizedIncomeLimit",
        label: "Uncategorized Income Limit",
      },
      {
        accessor: "unitsWSection811Subsidy",
        label: "Units w/ Section 811 Subsidy",
      },
      {
        accessor: "unitsWSection8FairMarketRent",
        label: "Units w/ Section 8 Fair Market Rent",
      },
      { accessor: "unitsWHousingVouchers", label: "Units w/ Housing Vouchers" },
      { accessor: "unitsWStaffUnit", label: "Units w/ Staff Unit" },
      {
        accessor: "unitsWOtherSubsidyType",
        label: "Units w/ Other Subsidy Type",
      },
      {
        accessor: "unitsWProjectBasedSection8Certificate",
        label: "Units w/ Project Based Section 8 Certificate",
      },
      {
        accessor: "unitsWUncategorizedSubsidy",
        label: "Units w/ Uncategorized Subsidy",
      },
    ],
  },

  fhlbProjects: {
    title: "FHLB Projects",
    items: [
      { accessor: "fhlbFundingId", label: "FHLB Funding ID" },
      { accessor: "parcelCount", label: "Number of Parcels" },
      { accessor: "hudPropertyName", label: "HUD Property Name" },
      { accessor: "applicationTypeName", label: "Application Type" },
      { accessor: "units", label: "# of Units" },
      { accessor: "assistedUnits", label: "# of Assisted Units" },
      {
        accessor: "50PercentAmiLimit",
        label: "# occupied by residents with income within 50% AMI Limit",
      },
      {
        accessor: "60PercentAmiLimit",
        label: "# occupied by residents with income within 60% AMI Limit",
      },
      {
        accessor: "80PercentAmiLimit",
        label: "# occupied by residents with income within 80% AMI Limit",
      },
      {
        accessor: "greaterThan80Ami",
        label: "# occupied by residents with income above 80% AMI Limit",
      },
      { accessor: "retentionExpiration", label: "Retention Expiration Date" },
    ],
  },
  fhlbProperties: {
    title: "FHLB Property Records",
    items: [
      { accessor: "fhlbFundingId", label: "FHLB Funding ID" },
      { accessor: "hudPropertyName", label: "HUD Property Name" },
      { accessor: "applicationTypeName", label: "Application Type" },
      { accessor: "units", label: "# of Units" },
      { accessor: "assistedUnits", label: "# of Assisted Units" },
      {
        accessor: "50PercentAmiLimit",
        label: "# occupied by residents with income within 50% AMI Limit",
      },
      {
        accessor: "60PercentAmiLimit",
        label: "# occupied by residents with income within 60% AMI Limit",
      },
      {
        accessor: "80PercentAmiLimit",
        label: "# occupied by residents with income within 80% AMI Limit",
      },
      {
        accessor: "greaterThan80Ami",
        label: "# occupied by residents with income above 80% AMI Limit",
      },
      { accessor: "retentionExpiration", label: "Retention Expiration Date" },
    ],
  },
};
