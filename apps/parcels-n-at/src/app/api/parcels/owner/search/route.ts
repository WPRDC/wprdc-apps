import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { fetchOwnerName } from "@/actions.ts";

interface ResponseBody {
  owner: string;
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ResponseBody>> {
  const searchTerm: string = (
    request.nextUrl.searchParams.get("q") ?? ""
  ).toLowerCase();

  const owner = await fetchOwnerName(searchTerm);

  return NextResponse.json<ResponseBody>({
    owner,
  });
}
