import { type NextRequest, NextResponse } from "next/server";
import {
  fetchSpaceratQuery,
  SpaceRATParams,
  SpaceRATResponse,
} from "@wprdc/api";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const response = await fetchSpaceratQuery(
    Object.fromEntries(searchParams) as SpaceRATParams,
  );

  return NextResponse.json<SpaceRATResponse>(response);
}
