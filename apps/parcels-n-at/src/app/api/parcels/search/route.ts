import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { RankedParcelIndex } from "@wprdc/types";
import sql from "@/db.ts";

interface ResponseBody {
  results: RankedParcelIndex[];
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

  let rankedParcels: RankedParcelIndex[] = await sql<RankedParcelIndex[]>`
      SELECT parcel_id,
             class,
             housenum,
             fraction,
             unit,
             street,
             city,
             state,
             zip,
             address
      FROM spacerat.parcel_index
      WHERE lower(address) LIKE ${searchTerm} || '%'
      LIMIT 10
  `;

  if (searchTerm.length > 10) {
    const idMatchedParcels: RankedParcelIndex[] = await sql<
      RankedParcelIndex[]
    >`
        SELECT parcel_id,
               class,
               housenum,
               fraction,
               unit,
               street,
               city,
               state,
               zip,
               address
        FROM spacerat.parcel_index
        WHERE lower(parcel_id) LIKE ${searchTerm} || '%'
        LIMIT 2
    `;
    rankedParcels = idMatchedParcels.concat(rankedParcels);
  }

  return NextResponse.json<ResponseBody>({
    results: rankedParcels,
    status: "success",
  });
}
