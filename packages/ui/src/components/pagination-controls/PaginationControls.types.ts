/**
 *
 * PaginationControls types
 *
 **/
export interface PaginationControlsProps {
  currentPage: number;
  pageCount: number;
  makeHref: (
    currentPage: number,
    mode: "back" | "forward" | "direct",
  ) => string;
}
