import { DatastoreField, DatastoreRecord, QueryResult } from "@wprdc/types";
import { FieldRecord } from "./types";

const HOST = process.env.NEXT_PUBLIC_API_HOST ?? "https://data.wprdc.org";

export async function fetchOwnerName(parcelID: string): Promise<string> {
  try {
    const requestURL = `https://tools.wprdc.org/property-whois/whois/${parcelID}/`;

    const response = await fetch(requestURL);
    const { name, success } = (await response.json()) as {
      name: string;
      success: boolean;
    };
    if (name) return name;
    else {
      throw new Error(`Owner not found for ${parcelID}`);
    }
  } catch (error) {
    console.error(`Owner not found for ${parcelID}`);
    throw new Error(`Owner not found for ${parcelID}`);
  }
}

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
