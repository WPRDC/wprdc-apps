import type { DatastoreRecord } from "../ckan";

export interface ParcelIndex extends DatastoreRecord {
  parcel_id: string;
  class: string;
  housenum: string;
  fraction: string;
  unit: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  address: string;
  owner_address: string;
  geom: string;
  centroid: string;
}

export type RankedParcelIndex = ParcelIndex & {
  dist: number;
};

export interface OwnerSearchRow {
  ownerAddress: string;
  count: number;
}

export interface LeadLine extends DatastoreRecord {
  parcel_id: string;
  more_than_one_point: string;
  all_points_match_address: string;
  all_points_match_private: string;
  all_points_match_public: string;
  public_status: string;
  private_status: string;
}

/**
 * Rate of elevated blood lead levels (EBLL) among children *tested* in a
 * census tract.
 *
 * Published by tract - `parcel_id` is joined on when fetched for a parcel.
 * Each year has a matching `note<year>` that explains a missing or unreliable
 * percentage (e.g. "Censored", "Unstable percent, interpret with caution").
 */
export interface EBLL extends DatastoreRecord {
  parcel_id: string;
  CensusTract: string;

  percentEBLL2015: number | null;
  note2015: string | null;
  percentEBLL2016: number | null;
  note2016: string | null;
  percentEBLL2017: number | null;
  note2017: string | null;
  percentEBLL2018: number | null;
  note2018: string | null;
  percentEBLL2019: number | null;
  note2019: string | null;
  percentEBLL2020: number | null;
  note2020: string | null;
  percentEBLL2021: number | null;
  note2021: string | null;
  percentEBLL2022: number | null;
  note2022: string | null;
  percentEBLL2023: number | null;
  note2023: string | null;
  percentEBLL2024: number | null;
  note2024: string | null;

  /** 2015-2020 combined */
  percentEBLL15_20: number | null;
  note15_20: string | null;
  /** 2021-2024 combined */
  percentEBLL2021_2024: number | null;
  note2021_2024: string | null;
}

/** Years with their own EBLL rate, oldest first */
export const EBLL_YEARS = [
  2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
] as const;

export interface WaterProvider extends DatastoreRecord {
  PIN: string;
  PROVIDER: string;
}

export interface PropertyAssessment extends DatastoreRecord {
  PARID: string;
  PROPERTYHOUSENUM?: string;
  PROPERTYFRACTION?: string;
  PROPERTYADDRESS?: string;
  PROPERTYCITY?: string;
  PROPERTYSTATE?: string;
  PROPERTYUNIT?: string | null;
  PROPERTYZIP?: string;
  MUNICODE?: string;
  MUNIDESC?: string;
  SCHOOLCODE?: string;
  SCHOOLDESC?: string;
  LEGAL1?: string;
  LEGAL2?: string;
  LEGAL3?: string;
  NEIGHCODE?: string;
  NEIGHDESC?: string;
  TAXCODE?: string;
  TAXDESC?: string;
  TAXSUBCODE?: string;
  TAXSUBCODE_DESC?: string;
  OWNERCODE?: string;
  OWNERDESC?: string;
  CLASS?: string;
  CLASSDESC?: string;
  USECODE?: string;
  USEDESC?: string;
  LOTAREA?: number;
  HOMESTEADFLAG?: string;
  CLEANGREEN?: string;
  FARMSTEADFLAG?: string;
  ABATEMENTFLAG?: string;
  RECORDDATE?: string;
  SALEDATE?: string;
  SALEPRICE?: number;
  SALECODE?: string;
  SALEDESC?: string;
  DEEDBOOK?: string;
  DEEDPAGE?: string;
  PREVSALEDATE?: string;
  PREVSALEPRICE?: number;
  PREVSALEDATE2?: string;
  PREVSALEPRICE2?: number;
  CHANGENOTICEADDRESS1?: string;
  CHANGENOTICEADDRESS2?: string;
  CHANGENOTICEADDRESS3?: string;
  CHANGENOTICEADDRESS4?: string;
  COUNTYBUILDING?: number;
  COUNTYLAND?: number;
  COUNTYTOTAL?: number;
  COUNTYEXEMPTBLDG?: number;
  LOCALBUILDING?: number;
  LOCALLAND?: number;
  LOCALTOTAL?: number;
  FAIRMARKETBUILDING?: number;
  FAIRMARKETLAND?: number;
  FAIRMARKETTOTAL?: number;
  STYLE?: string;
  STYLEDESC?: string;
  STORIES?: string;
  YEARBLT?: number;
  EXTERIORFINISH?: string;
  EXTFINISH_DESC?: string;
  ROOF?: string;
  ROOFDESC?: string;
  BASEMENT?: string;
  BASEMENTDESC?: string;
  GRADE?: string;
  GRADEDESC?: string;
  CONDITION?: string;
  CONDITIONDESC?: string;
  CDU?: string;
  CDUDESC?: string;
  TOTALROOMS?: number;
  BEDROOMS?: number;
  FULLBATHS?: number;
  HALFBATHS?: number;
  HEATINGCOOLING?: string;
  HEATINGCOOLINGDESC?: string;
  FIREPLACES?: number;
  BSMTGARAGE?: string;
  FINISHEDLIVINGAREA?: number;
  CARDNUMBER?: number;
  ALT_ID?: string;
  TAXYEAR?: number;
  ASOFDATE?: string;
}

export interface PropertySaleTransaction extends DatastoreRecord {
  PARID: string;
  PROPERTYHOUSENUM: number;
  PROPERTYFRACTION: string;
  PROPERTYADDRESSDIR: string;
  PROPERTYADDRESSSTREET: string;
  PROPERTYADDRESSSUF: string;
  PROPERTYADDRESSUNITDESC: string;
  PROPERTYUNITNO: string;
  PROPERTYCITY: string;
  PROPERTYSTATE: string;
  PROPERTYZIP: number;
  SCHOOLCODE: string;
  SCHOOLDESC: string;
  MUNICODE: string;
  MUNIDESC: string;
  RECORDDATE: string;
  SALEDATE: string;
  PRICE: number;
  DEEDBOOK: string;
  DEEDPAGE: string;
  SALECODE: string;
  SALEDESC: string;
  INSTRTYP: string;
  INSTRTYPDESC: string;
}

export interface FiledAssessmentAppeal extends DatastoreRecord {
  parcel_id: string;
  class: string;
  class_group: string;
  tax_status: string;
  hear_type: string;
  on_behalf_of: string;
  hrstatus: string;
  hearing_status: string;
  owner_name: string;
  school_district_code: string;
  school_district_name: string;
  muni_code: string;
  municipality: string;
  prev_taxyr_mkt_value: number;
  cur_mkt_value: number;
  as_of: string;
}

export interface ArchiveAssessmentAppeal extends DatastoreRecord {
  "PARCEL ID": string;
  "TAX YEAR": number;
  CLASS: string;
  "CLASS GROUP": string;
  TAX_STATUS: string;
  MUNI_CODE: number;
  MUNI_NAME: string;
  SCHOOL_CODE: number;
  SCHOOL_DISTRICT: string;
  HEARING_TYPE: string;
  COMPLAINANT: string;
  HEARING_STATUS: string;
  STATUS: string;
  "PRE APPEAL LAND": number;
  "PRE APPEAL BLDG": number;
  "PRE APPEAL TOTAL": number;
  "POST APPEAL LAND": number;
  "POST APPEAL BLDG": number;
  "POST APPEAL TOTAL": number;
  "HEARING CHANGE AMOUNT": number;
  "LAST UPDATE REASON": string;
  "CURRENT LAND VALUE": number;
  "CURRENT BLDG VALUE": number;
  "CURRENT TOTAL VALUE": number;
  "CURRENT VALUE vs PRE APPEAL": number;
  "HEARING DATE": string;
  "DISPO DATE": string;
  ELAPSED_DAYS: number;
}

export interface CityViolation extends DatastoreRecord {
  _id: number;
  casefile_number: string;
  address: string;
  parcel_id: string;
  status: string;
  investigation_date?: string;
  violation_description: string;
  violation_code_section: string;
  violation_spec_instructions: string;
  investigation_outcome: string;
  investigation_findings: string;
}

export interface ForeclosureFiling extends DatastoreRecord {
  pin: string;
  block_lot: string;
  filing_date: string;
  case_id: string;
  municipality: string;
  ward: string;
  docket_type: string;
  amount: number;
  plaintiff: string;
  last_activity: string;
}

export interface TaxLienWithCurrentStatus extends DatastoreRecord {
  pin: string;
  block_lot: string;
  filing_date: string;
  tax_year: number;
  dtd: string;
  lien_description: string;
  municipality: string;
  ward: string;
  last_docket_entry: string;
  amount: number;
  assignee: string;
  satisfied: string;
}

/** One year of unpaid county real estate tax on a parcel. */
export interface DelinquentTax extends DatastoreRecord {
  ar_id: string;
  /** Tax year, published as text (e.g. "2009"). */
  year: string;
  parcel_id: string;
  parcel_id_formatted: string;
  muni_name: string | null;
  school_district: string | null;
  /** Only populated for the small share of records with recorded payments. */
  last_pay_date: string | null;
  penalties: number;
  interest: number | null;
  orig_bill: number;
  /** Only populated for the small share of records with recorded payments. */
  total_payments: number | null;
  asof_date: string;
}

/**
 * City of Pittsburgh property tax delinquency - one row per delinquent parcel,
 * split into the current year and everything prior. Amounts are never null.
 */
export interface CityTaxDelinquency extends DatastoreRecord {
  /** County-format parcel ID. Literal "invalid input" where the city ID could not be converted. */
  pin: string;
  address: string | null;
  billing_city: string | null;
  current_delq_tax: number;
  current_delq_pi: number;
  /** Count of prior delinquent years, not a year number. */
  prior_years: number;
  prior_delq_tax: number;
  prior_delq_pi: number;
  state_description: string | null;
  neighborhood: string | null;
  council_district: string | null;
  ward: string | null;
  public_works_division: string | null;
  pli_division: string | null;
  police_zone: string | null;
  fire_zone: string | null;
  longitude: number | null;
  latitude: number | null;
}

export interface ConservatorshipRecord extends DatastoreRecord {
  pin: string;
  block_lot: string;
  filing_date: string;
  case_id: string;
  municipality: string;
  ward: string;
  party_type: string;
  party_name: string;
  last_activity: string;
}

export interface ParcelBoundary extends DatastoreRecord {
  NOTES: string;
  MUNICODE: string;
  PIN: string;
  Shape_Leng: string;
  COMMENTS: string;
  OBJECTID: string;
  MAPBLOCKLO: string;
  PSEUDONO: string;
  GlobalID: string;
  CALCACREAG: string;
  dataspatial__wkt: string;
}

export interface PLIPermit extends DatastoreRecord {
  permit_id: string;
  permit_type: string;
  owner_name: string;
  contractor_name: string;
  work_description: string;
  work_type: string;
  commercial_or_residential: string;
  total_project_value: string;
  issue_date: string;
  parcel_num: string;
  address: string;
  status: string;
}

export interface CondemnedStatus extends DatastoreRecord {
  parcel_id: string;
  address: string;
  owner: string;
  property_type: string;
  create_date: string;
  latest_inspection_result: string;
  latest_inspection_score: string;
  inspection_status: string;
}

export interface ParcelSearchResult {
  parcel_id: string;
  address: string;
  block_lot: string;
  fair_market_total: number | null;
  owner_address: string | null;
  location: string | null;
  housenum: string | null;
  fraction: string | null;
  unit: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  class: string | null;
}
