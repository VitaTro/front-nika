import React from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import NoResults from "../NoResults/NoResults";
import { PageLink, Pagination } from "../Products/Products.styled";
const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  const { t } = useTranslation();
  if (totalPages === 0) {
    return <NoResults />;
  }
  const pages = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PageLink
          key={i}
          onClick={() => onPageChange(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </PageLink>
      );
    }
  } else {
    pages.push(
      <PageLink
        key={1}
        onClick={() => onPageChange(1)}
        className={1 === currentPage ? "active" : ""}
      >
        1
      </PageLink>
    );
    pages.push(
      <PageLink
        key={2}
        onClick={() => onPageChange(2)}
        className={2 === currentPage ? "active" : ""}
      >
        2
      </PageLink>
    );
    pages.push(
      <PageLink
        key={3}
        onClick={() => onPageChange(3)}
        className={3 === currentPage ? "active" : ""}
      >
        3
      </PageLink>
    );

    if (currentPage > 3 && currentPage < totalPages - 2) {
      pages.push(<span key="ellipsis">...</span>);
      pages.push(
        <PageLink
          key={currentPage}
          onClick={() => onPageChange(currentPage)}
          className={"active"}
        >
          {currentPage}
        </PageLink>
      );
      pages.push(<span key="ellipsis2">...</span>);
    } else {
      pages.push(<span key="ellipsis">...</span>);
    }

    pages.push(
      <PageLink
        key={totalPages - 2}
        onClick={() => onPageChange(totalPages - 2)}
        className={totalPages - 2 === currentPage ? "active" : ""}
      >
        {totalPages - 2}
      </PageLink>
    );
    pages.push(
      <PageLink
        key={totalPages - 1}
        onClick={() => onPageChange(totalPages - 1)}
        className={totalPages - 1 === currentPage ? "active" : ""}
      >
        {totalPages - 1}
      </PageLink>
    );
    pages.push(
      <PageLink
        key={totalPages}
        onClick={() => onPageChange(totalPages)}
        className={totalPages === currentPage ? "active" : ""}
      >
        {totalPages}
      </PageLink>
    );
  }

  return (
    <Pagination>
      {totalPages > maxVisiblePages && (
        <PageLink
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaArrowLeft /> {/* Іконка стрілки вліво */}
        </PageLink>
      )}

      {pages}
      {totalPages > maxVisiblePages && (
        <PageLink
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaArrowRight /> {/* Іконка стрілки вправо */}
        </PageLink>
      )}
    </Pagination>
  );
};

export default PaginationComponent;
