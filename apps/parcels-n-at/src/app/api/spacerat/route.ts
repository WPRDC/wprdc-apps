import { type NextRequest, NextResponse } from "next/server";
import {
  fetchSpaceratQuery,
  type SpaceratParams,
  type SpaceratResponse,
} from "@wprdc/api";

export async function GET(
  request: NextRequest,
  { params }: { params: SpaceratParams },
) {
  const response = await fetchSpaceratQuery(params);

  return NextResponse.json<SpaceratResponse>(response);
}
