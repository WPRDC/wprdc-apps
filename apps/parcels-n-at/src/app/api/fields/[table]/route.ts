import type { DatastoreRecord } from "@wprdc/types";
import type { NextRequest } from "next/server";
import { fetchFields } from "@wprdc/api";

export async function GET<T extends DatastoreRecord = DatastoreRecord>(
  request: NextRequest,
  { params }: { params: { table: string } },
): Promise<Response> {
  const { table } = params;
  const fields = await fetchFields<T>(table);

  return Response.json({
    fields,
  });
}
