import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { CoordinatePair } from "@wprdc/types";
import sql from "@/db.ts";

export type GeocodeResponseBody =
  | {
      centroid: CoordinatePair;
      status: "success";
      bbox: [CoordinatePair, CoordinatePair];
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

  const result = await sql`
      SELECT "parcel_id",
             ST_AsGeoJSON(centroid) as centroid,
             ST_AsGeoJSON(ST_Envelope(geom)) as bbox
      FROM spacerat."parcel_index"
      WHERE "parcel_id" = ${parcelID}
      LIMIT 1
  `;
  const record = result[0];

  const bboxPolygon: CoordinatePair[][] = (
    JSON.parse(record.bbox) as {
      coordinates: CoordinatePair[][];
    }
  ).coordinates;

  const centroid: CoordinatePair = (
    JSON.parse(record.centroid) as {
      coordinates: CoordinatePair;
    }
  ).coordinates;

  if (!result)
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
    centroid,
    bbox: [bboxPolygon[0][0], bboxPolygon[0][2]],
  });
}
