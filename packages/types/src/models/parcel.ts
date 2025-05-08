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

  geom: string;
  centroid: string;
}

export type RankedParcelIndex = ParcelIndex & {
  dist: number;
};

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
  investigation_date: string;
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
}

export interface CondemnedStatus extends DatastoreRecord {
  parcel_id: string;
  address: string;
  owner: string;
  property_type: string;
  date: string;
  latest_inspection_result: string;
  latest_inspection_score: string;
  inspection_status: string;
}
