import React, { PropsWithChildren } from "react";
import { BlogListItem } from "./listing-list-item";

export { BlogListItem };

export interface ListingProps extends PropsWithChildren {
  page: number;
}

export function Listing({ children, page }: ListingProps) {
  return (
    <ul className="space-y-6" aria-label={`Page ${page} of blog posts`}>
      {children}
    </ul>
  );
}
