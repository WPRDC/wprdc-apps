const HOST = process.env.SPACERAT_HOST ?? "http://127.0.0.1:5000";

export type SpaceRATAggregateStats =
  | ContinuousAggregateStatsRecord
  | DiscreteAggregateStatsRecord
  | BooleanAggregateStatsRecord;

export interface ContinuousAggregateStatsRecord {
  first_quartile: number;
  max: number;
  mean: number;
  median: number;
  min: number;
  mode: number;
  n: number;
  stddev: number;
  sum: number;
  third_quartile: number;
}

export interface DiscreteAggregateStatsRecord {
  mode: string | number;
  n: number;
}

export interface BooleanAggregateStatsRecord {
  count: number;
  percent: number;
  n: number;
}

type RegionKey = string;
type QuestionKey = string;

/** Maps question IDs to aggregate stats */
export type QuestionRecord<
  T extends SpaceRATAggregateStats = SpaceRATAggregateStats,
> = Record<QuestionKey, T>;

/** Maps queried regions to their questions */
export type StatsResult<T extends QuestionRecord = QuestionRecord> = Record<
  RegionKey,
  T
>;

export type SpaceRATRecord = Record<string, string | number> & {
  time: string;
  region: string;
};

export interface SpaceRATResponse<T extends QuestionRecord = QuestionRecord> {
  results: {
    /** Top-level aggregate stats generated from SpaceRAT query */
    stats: StatsResult<T>;
    /** Subgeog record-level data used to calculate `stats` */
    records: SpaceRATRecord[];
  };
}

export interface SpaceRATParams {
  /** The question(s) being asked */
  question: string | string[];

  /** The region(s) to ask the question about */
  region: string | string[];

  /** The time period over which to answer the question(s) */
  timeAxis?: string;

  /** Filters geographic features in queries based on predefined categories */
  variant?: string;

  /** Filters geographic features in queries based on an argument */
  filter?: string;

  /** Argument to apply to `filter` param  */
  filterArg?: string;

  /** If "true", return aggregate statistics */
  aggregate?: boolean;

  /** If "true" return individual records at the subgeography-level */
  queryRecords?: boolean;
}

function parseParams(params: SpaceRATParams): Record<string, string> {
  const {
    question,
    region,
    timeAxis,
    variant,
    aggregate,
    queryRecords,
    filter,
    filterArg,
  } = params;

  const result: Record<string, string> = {
    question: typeof question === "string" ? question : question.join(","),
    region: typeof region === "string" ? region : region.join(","),
    aggregate: String(aggregate ?? true),
    queryRecords: String(queryRecords ?? false),
  };

  if (timeAxis) {
    result.timeAxis = timeAxis;
  }

  if (variant) {
    result.variant = variant;
  }

  if (filter && filterArg) {
    result.filter = filter;
    result.filterArg = filterArg;
  }

  return result;
}

export async function fetchSpaceratQuery<
  T extends QuestionRecord = QuestionRecord,
>(params: SpaceRATParams): Promise<SpaceRATResponse<T>> {
  const url = `${HOST}/answer?${new URLSearchParams(parseParams(params)).toString()}`;

  const response = await fetch(url);

  return (await response.json()) as SpaceRATResponse<T>;
}

export interface SpaceRATRESTResponse<
  T extends SpaceRATObject = SpaceRATObject,
> {
  results: T[];
}

export interface SpaceRATObject {
  id: string;
  name: string;
}

async function _fetchObjects<T extends SpaceRATObject = SpaceRATObject>(
  obj: string,
  id = "",
): Promise<SpaceRATRESTResponse<T>> {
  const url = `${HOST}/${obj}/${id}`;
  const response = await fetch(url);

  return (await response.json()) as SpaceRATRESTResponse<T>;
}

async function fetchObject<T extends SpaceRATObject>(
  obj: string,
  id: string,
): Promise<T> {
  const response = await _fetchObjects<T>(obj, id);
  return response.results[0];
}

async function fetchObjects<T extends SpaceRATObject>(
  obj: string,
): Promise<T[]> {
  const response = await _fetchObjects<T>(obj);
  return response.results;
}

export function fetchSource(id: string): Promise<Source> {
  return fetchObject<Source>("source", id);
}
export function fetchSources(): Promise<Source[]> {
  return fetchObjects<Source>("source");
}

export function fetchQuestion(id: string): Promise<Question> {
  return fetchObject<Question>("question", id);
}
export function fetchQuestions(): Promise<Question[]> {
  return fetchObjects<Question>("question");
}

export function fetchGeography(id: string): Promise<Geography> {
  return fetchObject<Geography>("geography", id);
}
export function fetchGeographies(): Promise<Geography[]> {
  return fetchObjects<Geography>("geography");
}

export function fetchMapConfig(id: string): Promise<MapConfig> {
  return fetchObject<MapConfig>("maps", id);
}
export function fetchMapConfigs(): Promise<MapConfig[]> {
  return fetchObjects<MapConfig>("maps");
}

export interface MapConfig extends SpaceRATObject {
  /** Extra information about the map */
  description: string;

  /** Data source the map shows data from */
  source: string;

  /** Available geographies */
  geographies: Geography[];

  /** Available questions */
  questions: Question[];

  /** Maps geography IDs to tilesjsons of this map's data at that geography */
  tilejsons: Record<string, string>;

  /** Maps variants to their respective tilejsons */
  variants: Record<string, VariantRecord>;
}

export interface VariantRecord {
  /** Maps geography IDs to tilesjsons of this map's data at that geography */
  tilejsons: Record<string, string>;
  /** Extra questions  for the variant */
  questions: SpaceRATObject[];
}

export type Geography = SpaceRATObject;
export type Question = SpaceRATObject;
export type Source = SpaceRATObject;
