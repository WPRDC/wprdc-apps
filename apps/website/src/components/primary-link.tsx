import { A } from "@wprdc/ui";
import React from "react";

export interface PrimaryLinkProps {
  url?: string | null;
  label?: string | null;
  external?: boolean;
}

export function PrimaryLink({ url, label, external = true }: PrimaryLinkProps) {
  if (!url) return null;
  return (
    <div className="text-lg mt-8 line-clamp-1">
      <A className="hover:text-text " href={url}>
        {label ?? url}
      </A>
    </div>
  );
}
