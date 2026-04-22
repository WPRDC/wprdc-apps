import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import sql from "@/db";

interface SearchRecord {
  parcelCount: number;
}

interface ResponseBody {
  parcelCount: number;
}

export async function GET(request: NextRequest): Promise<Response> {
  const geometry = request.nextUrl.searchParams.get("geometry");
  if (!geometry) return NextResponse.error();

  const [{ parcelCount }] = await sql<SearchRecord[]>`
        SELECT count(parcel_id) as "parcelCount"
         FROM spacerat.parcel_index 
         WHERE ST_Intersects(
           "geom", 
          ST_GeomFromGeoJSON(${geometry})
         )
    `;

  return NextResponse.json<ResponseBody>({
    parcelCount,
  });
}
