import type {
  DatastoreField,
  DatastoreRecord,
  FieldRecord,
  QueryResult,
  SearchResponseBody,
} from "@wprdc/types";

const HOST = process.env.NEXT_PUBLIC_API_HOST ?? "https://data.wprdc.org";
const API_KEY = process.env.CKAN_API_TOKEN;

const defaultOptions: Partial<RequestInit> = {
  headers: API_KEY ? { Authorization: API_KEY } : {},
};

/** Validates a response ensuring its in the format expected from CKAN */
export function isValidCKANResponse<T extends DatastoreRecord>(
  body: unknown,
): body is SearchResponseBody<T> {
  try {
    // we currently assume if the shared keys are there, the rest is correct
    return (
      Object.prototype.hasOwnProperty.call(body, "success") &&
      Object.prototype.hasOwnProperty.call(body, "help")
    );
  } catch (e) {
    // eslint-disable-next-line no-console -- should rarely occur
    console.warn(e);
    return false;
  }
}

/**
 * Fetch data from the CKAN datastore using the datastore_search_sql endpoint
 *
 * @param sql - the sql query to send
 * @param queryParams - (optional) extra params
 * @param options - (optional) extra fetch init options
 */
export async function fetchSQLSearch<T extends DatastoreRecord>(
  sql: string,
  queryParams: Record<string, string | number> = {},
  options: RequestInit = {},
): Promise<Partial<QueryResult<T>>> {
  try {
    // Build request URL
    const requestUrl = `${HOST}/api/action/datastore_search_sql?${new URLSearchParams(
      { ...queryParams, sql },
    ).toString()}`;

    // Trigger API call
    const response = await fetch(requestUrl, { ...defaultOptions, ...options });
    const body: unknown = await response.json();
    if (isValidCKANResponse<T>(body) && body.success) {
      const { fields, records } = body.result;
      return { fields, records };
    }
  } catch (error) {
    console.error(error);
  }
  return {};
}

/**
 * Fetch data from the CKAN datastore using the datastore_search endpoint
 *
 * @param table - the datastore table to fetch from
 * @param filters - filters to apply to the table
 * @param queryParams - (optional) extra query params
 * @param options - (optional) extra fetch init options
 */
export async function fetchDatastoreSearch<T extends DatastoreRecord>(
  table: string,
  filters?: string,
  queryParams: Record<string, string | number> = {},
  options: RequestInit = {},
): Promise<Partial<QueryResult<T>>> {
  try {
    // Build request URL
    const requestUrl = `${HOST}/api/action/datastore_search?${new URLSearchParams(
      { ...queryParams, id: table, filters: filters ?? "{}" },
    ).toString()}`;

    // Trigger API call
    const response = await fetch(requestUrl, { ...defaultOptions, ...options });

    const body: unknown = await response.json();

    if (isValidCKANResponse<T>(body) && body.success) {
      const { fields, records } = body.result;
      return { fields, records };
    }
  } catch (error) {
    console.error(error);
  }
  return {};
}

/**
 * Converts array of fields to an object keyed by field names
 *
 * @param fields - array of fields to convert
 */
export function toFieldLookup<T extends DatastoreRecord>(
  fields: DatastoreField<T>[],
): FieldRecord<T> {
  return fields.reduce<Partial<FieldRecord<T>>>(
    (acc, curr) => ({ ...acc, [curr.id]: curr }),
    {},
  ) as FieldRecord<T>; // after reduction, all keys from array are added
}

/**
 * Fetches field definitions for a ckan datastore table, have a filter function
 * applied against it before returning a filtered set of fields.
 *
 * @param table - the datastore table to fetch from
 * @param filter - function to apply when filtering fields
 */
export async function fetchFields<R extends DatastoreRecord>(
  table: string,
  filter?: (field: DatastoreField<R>) => boolean,
): Promise<DatastoreField<R>[]> {
  const result = await fetchDatastoreSearch<R>(table, undefined, { limit: 0 });
  const fields = Object.values(result.fields ?? {});
  if (filter) return fields.filter(filter);
  return fields;
}
