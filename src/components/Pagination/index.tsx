import React from "react";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30],
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < pageCount) onPageChange(currentPage + 1);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    onPageSizeChange(newPageSize);
  };

  return (
    <div>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page Size:</span>
      <select value={pageSize} onChange={handlePageSizeChange}>
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <button onClick={handleNextPage} disabled={currentPage === pageCount}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
