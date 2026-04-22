import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import sql from "@/db.ts";
import { OwnerSearchRow } from "@wprdc/types";



interface ResponseBody {
  results: OwnerSearchRow[];
  status: "too-short" | "success";
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ResponseBody>> {
  const searchTerm: string = (
    request.nextUrl.searchParams.get("q") ?? ""
  ).toLowerCase();

  // return early on short requests
  if (!searchTerm || searchTerm.length < 3)
    return NextResponse.json<ResponseBody>({
      results: [],
      status: "too-short",
    });

  const rankedParcels: OwnerSearchRow[] = await sql<OwnerSearchRow[]>`
      SELECT *
      FROM (SELECT owner_address as "ownerAddress", count(parcel_id) as "count"
            FROM spacerat.parcel_index
            WHERE lower(owner_address) LIKE ${searchTerm} || '%'
            GROUP BY owner_address)
      LIMIT 10;
  `;

  return NextResponse.json<ResponseBody>({
    results: rankedParcels,
    status: "success",
  });
}
