import { fetchFields } from "@wprdc/api";
import type { DatastoreRecord } from "@wprdc/types";
import type { NextRequest } from "next/server";

export async function GET<T extends DatastoreRecord = DatastoreRecord>(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> },
): Promise<Response> {
  const { table } = await params;
  console.log(table);

  const fields = await fetchFields<T>(table);

  return Response.json({
    fields,
  });
}
