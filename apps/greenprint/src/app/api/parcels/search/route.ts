import { NextRequest, NextResponse } from "next/server";
import { ParcelSearchResult } from "@wprdc/types";

const SOLR_URL = process.env.SOLR_URL ?? "http://localhost:8983/solr/parcels";
const MAX_ROWS = 10;
const RETURN_FIELDS = [
  "parcel_id",
  "address",
  "block_lot",
  "fair_market_total",
  "owner_address",
  "location",
  "housenum",
  "fraction",
  "unit",
  "street",
  "city",
  "state",
  "zip",
  "class",
].join(",");

interface SolrResponse {
  response: {
    numFound: number;
    start: number;
    docs: ParcelSearchResult[];
  };
}

interface SearchResponse {
  results: ParcelSearchResult[];
}

interface ErrorResponse {
  error: string;
}

export async function GET(
  req: NextRequest,
): Promise<NextResponse<SearchResponse | ErrorResponse>> {
  const q = req.nextUrl.searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const params = new URLSearchParams({
    q,
    defType: "edismax",
    qf: [
      "parcel_id^100",
      "parcel_id_short^100",
      "block_lot^100",
      "address^10",
      "owner_address^5",
    ].join(" "),
    pf: ["id^200", "parcel_id_short^200", "block_lot^200", "address^20"].join(
      " ",
    ),
    qs: "1",
    ps: "0",
    mm: "1",
    fl: RETURN_FIELDS,
    rows: String(MAX_ROWS),
    wt: "json",
  });

  const fuzzyQ = q
    .split(/\s+/)
    .map((term) => `address:${term}~1 owner_address:${term}~1`)
    .join(" ");

  params.set("bq", fuzzyQ);

  try {
    const res = await fetch(`${SOLR_URL}/select?${params.toString()}`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error("Solr error:", res.status, await res.text());
      return NextResponse.json(
        { error: "Search service error" },
        { status: 502 },
      );
    }

    const data: SolrResponse = await res.json();
    const results = data.response?.docs ?? [];

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Search fetch failed:", err);
    return NextResponse.json(
      { error: "Search service unavailable" },
      { status: 503 },
    );
  }
}
