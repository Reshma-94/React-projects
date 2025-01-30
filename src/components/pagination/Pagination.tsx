import { PaginationType } from "./ImageContainer";

export default function Pagination({
  pageNumber,
  setPageNumber,
}: PaginationType) {
  const prevArr = Array.from({ length: 3 }, (_, index) => {
    return pageNumber - 1 - index;
  })
    .filter((item) => item > 0)
    .sort();

  const nextFourArr = Array.from({ length: 4 }, (_, index) => {
    return pageNumber + index;
  });
  const paginationArr = [...prevArr, ...nextFourArr];

  const handleNext = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handlePrev = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };
  return (
    <div className="pagination-container">
      {pageNumber > 1 && (
        <div className="page-btn" onClick={() => handlePrev()}>
          Prev
        </div>
      )}
      {paginationArr?.length > 0 &&
        paginationArr?.map((page, index) => {
          return (
            <div
              key={index}
              onClick={() => setPageNumber(page)}
              className={`page-btn ${page === pageNumber ? "isActive" : ""}`}
            >
              {page}
            </div>
          );
        })}
      <div className="page-btn" onClick={() => handleNext()}>
        Next
      </div>
    </div>
  );
}
