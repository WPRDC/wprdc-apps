import {
  DatastoreField,
  DatastoreRecord,
  FieldRecord,
  QueryResult,
} from "@wprdc/types";

const HOST = process.env.NEXT_PUBLIC_API_HOST ?? "https://data.wprdc.org";

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
    const response = await fetch(requestUrl, options);
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
  filters: string,
  queryParams: Record<string, string> = {},
  options: RequestInit = {},
): Promise<Partial<QueryResult<T>>> {
  try {
    // Build request URL
    const requestUrl = `${HOST}/api/action/datastore_search?${new URLSearchParams(
      { ...queryParams, id: table, filters },
    ).toString()}`;

    // Trigger API call
    const response = await fetch(requestUrl, options);
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
