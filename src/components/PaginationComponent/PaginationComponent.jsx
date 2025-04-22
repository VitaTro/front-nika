import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import NoResults from "../NoResults/NoResults";
import { PageLink, Pagination } from "./PaginationComponent.styled";

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages === 0) {
    return <NoResults />;
  }

  const pages = [];
  const maxVisiblePages = 5;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1) ||
      (i < maxVisiblePages && totalPages < maxVisiblePages)
    ) {
      pages.push(
        <PageLink
          key={i}
          onClick={() => onPageChange(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </PageLink>
      );
    } else if (
      i === currentPage - 2 ||
      i === currentPage + 2 ||
      (i === totalPages - 1 && totalPages > maxVisiblePages)
    ) {
      pages.push(<span key={`ellipsis-${i}`}>...</span>);
    }
  }

  return (
    <Pagination>
      <PageLink
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaArrowLeft />
      </PageLink>

      {pages}

      <PageLink
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaArrowRight />
      </PageLink>
    </Pagination>
  );
};

export default PaginationComponent;
