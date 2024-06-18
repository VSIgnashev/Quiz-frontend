import React from "react";
import usePagination from "../../hooks/usePagination";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const PaginationC = (props) => {
  const {
    currentPage,
    totalAmountOfQuizes,
    siblingCount,
    pageSize,
    onPageChange,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalAmountOfQuizes,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrev = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className=" flex justify-center mt-10">
      <ul className="flex">
        <li onClick={() => onPrev()}>
          <button disabled={currentPage === 1}>
            <ArrowBackIos />
          </button>
        </li>
        {paginationRange.map((pageNumber, i) => {
          if (pageNumber === "Dots") {
            return <li key={i}>&#8230</li>;
          }
          return (
            <li
              key={i}
              className={currentPage === pageNumber ? "bg-red-600" : ""}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li onClick={() => onNext()}>
          <button disabled={currentPage === lastPage}>
            <ArrowForwardIos />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PaginationC;
