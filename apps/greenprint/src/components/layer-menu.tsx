"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ListBox, ListBoxSection, Header } from "react-aria-components";
import type { Selection } from "react-aria-components";
import { LayerMenuItem } from "@/components/layer-menu-item";
import layers from "@/layers";
import { LAYER_QUERY_KEY } from "@/util.ts";

export function LayerMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedKeys = useMemo<Set<string>>(() => {
    const raw = searchParams.get(LAYER_QUERY_KEY);
    if (!raw) return new Set();
    return new Set(raw.split(",").filter(Boolean));
  }, [searchParams]);

  const handleSelectionChange = useCallback(
    (next: Selection) => {
      const nextSet =
        next === "all"
          ? new Set(
              Object.values(layers).flatMap((v) => v.layers.map((l) => l.slug)),
            )
          : new Set([...next].map(String));

      const params = new URLSearchParams(searchParams.toString());
      if (nextSet.size === 0) {
        params.delete(LAYER_QUERY_KEY);
      } else {
        params.set(LAYER_QUERY_KEY, Array.from(nextSet).join(","));
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  return (
    <ListBox
      aria-label="Layer select"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
      className="w-full max-w-xs scroll-pt-1 gap-2 overflow-auto bg-white"
    >
      {Object.entries(layers).map(([k, v]) => (
        <ListBoxSection key={k}>
          <Header className="sticky top-0 bg-white px-2 pt-2 pb-0.5 font-semibold text-gray-500 uppercase">
            {v.label}
          </Header>
          {v.layers.map((l) => (
            <LayerMenuItem
              key={l.slug}
              id={l.slug}
              name={l.title}
              geoType={l.symbology.geoType}
              extent={l.extent?.label ?? ""}
              publisher={l.source.publisher}
            />
          ))}
        </ListBoxSection>
      ))}
    </ListBox>
  );
}
