import { DatastoreRecord } from "../ckan";

export interface Neighborhood extends DatastoreRecord {
  GlobalID: string;
  OBJECTID: string;
  Shape__Area: string;
  Shape__Length: string;
  acres: string;
  aland10: string;
  awater10: string;
  blkgrpce10: string;
  countyfp10: string;
  created_date: string;
  created_user: string;
  dpwdiv: string;
  fid_blockg: string;
  fid_neighb: string;
  funcstat10: string;
  geoid10: string;
  hood: string;
  hood_no: string;
  intptlat10: string;
  intptlon10: string;
  last_edited_date: string;
  last_edited_user: string;
  mtfcc10: string;
  namelsad10: string;
  neighbor_: string;
  neighbor_i: string;
  page_number: string;
  perimeter: string;
  pghdb_sde_Neighborhood_2010_are: string;
  plannerassign: string;
  sectors: string;
  shape_ar_1: string;
  shape_le_1: string;
  shape_leng: string;
  sqmiles: string;
  statefp10: string;
  temp: string;
  tractce10: string;
  unique_id: string;
}

export interface Municipality extends DatastoreRecord {
  ACRES: string;
  ASSESSORTERRITORY: string;
  CNTL_ID: string;
  CNTYCOUNCIL: string;
  COG: string;
  CONGDIST: string;
  EOC: string;
  FIPS: string;
  GlobalID: string;
  LABEL: string;
  MUNICODE: string;
  NAME: string;
  OBJECTID: string;
  REGION: string;
  SCHOOLD: string;
  SHAPE_Area: string;
  SHAPE_Length: string;
  SQMI: string;
  TYPE: string;
  VALUATIONAREA: string;
  YEARCONVERTED: string;
}
