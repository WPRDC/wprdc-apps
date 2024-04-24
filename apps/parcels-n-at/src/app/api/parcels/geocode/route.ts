import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { geocodeParcel } from "@wprdc/api";
import type { Coordinate } from "@wprdc/types";

export type GeocodeResponseBody =
  | {
      centroid: Coordinate;
      status: "success";
      bbox: [Coordinate, Coordinate];
    }
  | {
      status: "error";
      message: string;
      centroid: undefined;
      bbox: undefined;
    };

export async function GET(
  request: NextRequest,
): Promise<NextResponse<GeocodeResponseBody>> {
  const parcelID = request.nextUrl.searchParams.get("pid");
  if (!parcelID)
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: `Parcel ID missing!`,
      }),
      {
        status: 400,
      },
    );

  const response = await geocodeParcel(parcelID);

  if (!response)
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: `Nothing found for ${parcelID}`,
      }),
      {
        status: 404,
      },
    );

  return NextResponse.json<GeocodeResponseBody>({
    status: "success",
    centroid: response.centroid,
    bbox: response.bbox,
  });
}
