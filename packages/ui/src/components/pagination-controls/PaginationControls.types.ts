/**
 *
 * PaginationControls types
 *
 **/
export interface PaginationControlProps {
  currentPage: number;
  pageCount: number;
  makeHref: (
    currentPage: number,
    mode: "back" | "forward" | "direct",
  ) => string;
}
