/**
 *
 * PaginationControls
 *
 * Controls for navigating paginated content
 *
 **/
import * as React from "react";
import Link from "next/link";
import type { PaginationControlProps } from "./PaginationControls.types.ts";

export function PaginationControls({
  currentPage,
  pageCount,
  makeHref,
}: PaginationControlProps): React.ReactElement {
  const pages = Array.from(Array(pageCount + 1).keys()).filter((n) => n !== 0);

  if (pageCount < 2) return <div className="py-4" />;

  return (
    <nav className="ui-my-4 ui-font-mono ui-text-2xl">
      {currentPage > 1 ? (
        <Link
          className="ui-inline-block ui-decoration-2 hover:ui-underline"
          href={makeHref(currentPage, "back")}
        >
          {"<<"}
        </Link>
      ) : (
        <div className="ui-inline-block ui-text-textSecondary dark:ui-text-textSecondaryDark">
          {"<<"}
        </div>
      )}
      <ol className="ui-inline-block">
        {pages.map((page) => (
          <li className="ui-mx-2 ui-inline-block" key={page}>
            {page !== currentPage ? (
              <Link
                className="ui-decoration-2 hover:ui-underline"
                href={makeHref(currentPage, "direct")}
              >
                {page}
              </Link>
            ) : (
              <div className="ui-text-textSecondary dark:ui-text-textSecondaryDark">
                {page}
              </div>
            )}
          </li>
        ))}
      </ol>
      {currentPage < pageCount ? (
        <Link
          className="ui-inline-block ui-decoration-2 hover:ui-underline"
          href={makeHref(currentPage, "forward")}
        >
          {">>"}
        </Link>
      ) : (
        <div className="ui-inline-block ui-text-textSecondary dark:ui-text-textSecondaryDark">
          {">>"}
        </div>
      )}
    </nav>
  );
}
