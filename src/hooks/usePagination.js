import { useMemo } from "react";

const usePagination = ({
  totalAmountOfQuizes,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, id) => id + start);
  };

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalAmountOfQuizes / pageSize);

    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPageNumbers > totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, "Dots", totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageNumbers - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, "Dots", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "Dots", ...middleRange, "Dots", totalPageCount];
    }
  }, [totalAmountOfQuizes, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

export default usePagination;
