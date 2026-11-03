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
  // exact lookup, used to check that an owner address from elsewhere (e.g. a
  // link to the bulk downloader) is one this search would return
  const address = request.nextUrl.searchParams.get("address");
  if (address !== null) {
    const results = address.trim()
      ? await sql<OwnerSearchRow[]>`
          SELECT owner_address as "ownerAddress", count(parcel_id) as "count"
          FROM spacerat.parcel_index
          WHERE owner_address = ${address}
          GROUP BY owner_address
        `
      : [];
    return NextResponse.json<ResponseBody>({ results, status: "success" });
  }

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
