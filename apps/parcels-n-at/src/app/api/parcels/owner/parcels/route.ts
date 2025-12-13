import { NextRequest, NextResponse } from "next/server";
import sql from "@/db.ts";

interface ResponseBody {
  owner: string | null;
  parcels: {
    id: string;
    address: string;
    useClass: string;
    assessmentValue: number;
    yearBuilt: string;
  }[];
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ResponseBody>> {
  const searchParams = request.nextUrl.searchParams;
  const ownerAddress = searchParams.get("ownerAddress")?.trim();

  if (!ownerAddress) {
    return NextResponse.json({
      owner: "",
      parcels: [],
    });
  }

  const records = await sql<ResponseBody["parcels"]>`
    SELECT idx.parcel_id                as id,
           idx.address                  as address,
           idx.class                    as "useClass",
           assessment."FAIRMARKETTOTAL" as "assessmentValue",
           idx.year_built               as "yearBuilt"
    FROM spacerat.parcel_index idx
           JOIN public."65855e14-549e-4992-b5be-d629afc676fa" assessment
                ON idx.parcel_id = assessment."PARID"
    WHERE owner_address LIKE ${ownerAddress};
  `;

  return NextResponse.json<ResponseBody>({
    owner: ownerAddress,
    parcels: records,
  });
}
