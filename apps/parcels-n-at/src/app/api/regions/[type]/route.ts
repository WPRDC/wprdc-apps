import type { DatastoreRecord } from "@wprdc/types";
import type { NextRequest } from "next/server";
import sql from "@/db.ts";

export async function GET<T extends DatastoreRecord = DatastoreRecord>(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> },
): Promise<Response> {
  const { type } = await params;

  const table_name = `${type}_index`;

  const records = await sql`
    SELECT id, name FROM spacerat.${sql(table_name)}
  `;

  return Response.json({
    records,
  });
}
