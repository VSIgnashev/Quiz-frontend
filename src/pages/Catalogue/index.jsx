import React, { useEffect, useState } from "react";
import Header from "../../components/Header/index";
import QuizCard from "../../components/QuizCard/QuizCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import QuizCardSkeleton from "../../components/QuizCard/QuizCardSkeleton";
import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function Catalogue() {
  const GET_QUIZES_URL = "/quiz";

  const [quizesQty, setQuizesQty] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [catalogue, setCatalogue] = useState(["z", "s", "s"]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  const [searchParams, setSearchParams] = useSearchParams();

  const axiosPrivate = useAxiosPrivate();

  const fetchCatalogue = async () => {
    try {
      setIsLoading(true);

      const firstItemIdex = (currentPage - 1) * pageSize;

      const response = await axiosPrivate.get(GET_QUIZES_URL, {
        params: { limit: pageSize, offset: firstItemIdex },
      });
      setQuizesQty(response.data.count);
      setCatalogue(response.data.values);
    } finally {
      ("tik");

      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogue();

    searchParams.size && setCurrentPage(Number(searchParams.get("page")));
  }, []);

  useEffect(() => {
    fetchCatalogue();
  }, [currentPage]);

  useEffect(() => {});

  const renderQuizes = () => {
    return (
      <>
        {isLoading ? (
          <>
            <QuizCardSkeleton />
            <QuizCardSkeleton />
            <QuizCardSkeleton />
            <QuizCardSkeleton />
            <QuizCardSkeleton />
          </>
        ) : (
          <>
            {catalogue?.map((item) => {
              return (
                <>
                  <QuizCard
                    title={item.title}
                    description={item.description}
                    quizId={item.id}
                    imageId={item.imageUrl}
                  />
                </>
              );
            })}
          </>
        )}
      </>
    );
  };
  // const handleSubmit = (e) => {                    //search form handler
  //   e.preventDefault();
  //   const form = e.target;

  //   const query = form.search.value;
  //   setSearchParams({ post: query });
  // };

  const handlePageChange = (e, page) => {
    setSearchParams({ page: page });
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <Header />

        <div className="flex flex-wrap pt-[75px] px-[90px] gap-x-[75px] gap-y-[50px]">
          {renderQuizes()}
        </div>
        <div className="mt-14 flex justify-center">
          <Pagination
            onChange={handlePageChange}
            count={Math.ceil(quizesQty / pageSize)}
            page={currentPage}
            color="primary"
            size="large"
          />
        </div>
      </div>
    </>
  );
}

export default Catalogue;
