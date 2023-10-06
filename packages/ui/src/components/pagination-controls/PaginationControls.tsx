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

export function PaginationControl({
  currentPage,
  pageCount,
  path,
}: PaginationControlProps): React.ReactElement {
  const pages = Array.from(Array(pageCount + 1).keys()).filter((n) => n !== 0);

  if (pageCount < 2) return <div className="py-4" />;

  return (
    <nav className="my-4 text-2xl">
      {currentPage > 1 ? (
        <Link
          className="inline-block decoration-2 hover:underline"
          href={`${path}/${currentPage - 1}`}
        >
          {"<<"}
        </Link>
      ) : (
        <div className="text-textSecondary dark:text-textSecondaryDark inline-block">
          {"<<"}
        </div>
      )}
      <ol className="inline-block">
        {pages.map((page) => (
          <li className="mx-2 inline-block" key={page}>
            {page !== currentPage ? (
              <Link
                className=" decoration-2 hover:underline"
                href={`${path}/${page}`}
              >
                {page}
              </Link>
            ) : (
              <div className="text-textSecondary dark:text-textSecondaryDark">
                {page}
              </div>
            )}
          </li>
        ))}
      </ol>
      {currentPage < pageCount ? (
        <Link
          className="inline-block decoration-2 hover:underline"
          href={`${path}/${currentPage + 1}`}
        >
          {">>"}
        </Link>
      ) : (
        <div className="text-textSecondary dark:text-textSecondaryDark inline-block">
          {">>"}
        </div>
      )}
    </nav>
  );
}
