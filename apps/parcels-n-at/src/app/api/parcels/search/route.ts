import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { autocompleteParcelSearch } from "@wprdc/api";
import type { RankedParcelIndex } from "@wprdc/types";

interface ResponseBody {
  results: RankedParcelIndex[];
  status: "too-short" | "success";
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ResponseBody>> {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 3)
    return NextResponse.json<ResponseBody>({
      results: [],
      status: "too-short",
    });

  const rankedParcels = await autocompleteParcelSearch(query, 10);

  return NextResponse.json<ResponseBody>({
    results: rankedParcels,
    status: "success",
  });
}
