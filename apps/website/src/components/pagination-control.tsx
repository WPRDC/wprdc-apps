import { A } from "@wprdc/ui";

export interface PaginationControlProps {
  currentPage: number;
  pageCount: number;
  path: string;
}

export function PaginationControl({
  currentPage,
  pageCount,
  path,
}: PaginationControlProps) {
  const pages = Array.from(Array(pageCount + 1).keys()).filter((n) => n !== 0);

  if (pageCount < 2) return <div className="py-4"></div>;

  return (
    <nav className="my-4 text-lg" aria-label="pages">
      {currentPage > 1 ? (
        <A
          href={`${path}/${currentPage - 1}`}
          className="inline-block decoration-2 hover:underline"
          aria-label="Previous page"
        >
          {"<<"}
        </A>
      ) : (
        <button
          className="text-textSecondary dark:text-textSecondaryDark inline-block"
          disabled
          aria-label="Previous page"
        >
          {"<<"}
        </button>
      )}
      <ol className="inline-block">
        {pages.map((page) => (
          <li key={page} className="mx-2 inline-block">
            {page !== currentPage ? (
              <A className="decoration-2" href={`${path}/${page}`}>
                {page}
              </A>
            ) : (
              <button
                className="text-textSecondary font-black dark:text-textSecondaryDark"
                disabled
                aria-disabled
              >
                {page}
              </button>
            )}
          </li>
        ))}
      </ol>
      {currentPage < pageCount ? (
        <A
          href={`${path}/${currentPage + 1}`}
          className="inline-block decoration-2 hover:underline"
          aria-label="Next page"
        >
          {">>"}
        </A>
      ) : (
        <div
          className="text-textSecondary dark:text-textSecondaryDark inline-block"
          aria-hidden="true"
          aria-label="Next page"
        >
          {">>"}
        </div>
      )}
    </nav>
  );
}
