import {
  DatastoreField,
  DatastoreRecord,
  FieldRecord,
  QueryResult,
} from "@wprdc/types";

const HOST = process.env.NEXT_PUBLIC_API_HOST ?? "https://data.wprdc.org";
const API_KEY = process.env.CKAN_API_TOKEN;

const defaultOptions: Partial<RequestInit> = {
  headers: API_KEY ? { Authorization: `${API_KEY}` } : {},
};

export async function fetchSQLSearch<T extends DatastoreRecord>(
  sql: string,
  queryParams: Record<string, string> = {},
  options: RequestInit = {},
): Promise<Partial<QueryResult<T>>> {
  try {
    // Build request URL
    const requestUrl = `${HOST}/api/action/datastore_search_sql?${new URLSearchParams(
      { ...queryParams, sql },
    ).toString()}`;

    // Trigger API call
    const response = await fetch(requestUrl, { ...defaultOptions, ...options });
    const body: {
      result: {
        records: T[];
        fields: DatastoreField<T>[];
      };
    } = await response.json();
    const result = body["result"];
    if (result) return { fields: result["fields"], records: result["records"] };
    else return {};
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
}

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
    const body: {
      result: {
        records: T[];
        fields: DatastoreField<T>[];
      };
    } = await response.json();

    const result = body["result"];
    if (result) return { fields: result["fields"], records: result["records"] };
    else return {};
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
}

export function toFieldLookup<T extends DatastoreRecord>(
  fields: DatastoreField<T>[],
): FieldRecord<T> {
  return fields.reduce(
    (acc, curr) => ({ ...acc, [curr.id]: curr }),
    {} as FieldRecord<T>,
  );
}

/**
 * Fetches field definitions for a ckan datastore table
 * @param table
 * @param filter
 */
export async function fetchFields<R extends DatastoreRecord>(
  table: string,
  filter?: (field: DatastoreField<R>) => boolean,
): Promise<DatastoreField<R>[]> {
  const result = await fetchDatastoreSearch<R>(table, undefined, { limit: 0 });
  const fields = Object.values(result.fields ?? {});
  if (!!filter) return fields.filter(filter);
  return fields;
}
