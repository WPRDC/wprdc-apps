"use client";

import { useSearchParams } from "next/navigation";
import { A } from "@wprdc/ui";

interface SelectionLinkProps {
  id: string;
  name: string;
}

export default function SelectionLink({ id, name }: SelectionLinkProps) {
  const _searchParams = useSearchParams();
  const searchParams = new URLSearchParams({
    ...Object.fromEntries(_searchParams.entries()),
    id,
  });

  return <A href={`/watchlist/?${searchParams.toString()}`}>{name}</A>;
}
