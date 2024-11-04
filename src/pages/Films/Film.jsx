import { Pagination, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFilms, getNextPageFilms } from "../../features/actions/FilmAction";
import FilmCard from "../../components/Film/FilmCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import DeleteModal from "../../components/DeleteModal";

const Films = () => {
  const { FilmData, isLoading } = useSelector((state) => state.Films);
  const [page, setPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilms());
    setPage(2);
  }, [dispatch]);

  const fetchMoreData = () => {
    dispatch(getNextPageFilms({ page }));
    setPage((prev) => prev + 1);
  };

  return (
    <>
    <div className="py-10">
      <div className="text-2xl px-10">Film</div>
      <div className=" px-10 flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-8 bg-white">
        <Link
          to="/films/add"
          className="bg-blue-600 rounded-md text-white px-3 py-1 font-semibold"
        >
          Add
        </Link>
      </div>

      {/* <div>
        {isLoading && (
          <>
            <Skeleton animation="wave" height={300} width={300} />
            <Skeleton animation="wave" height={300} width={300} />
            <Skeleton animation="wave" height={300} width={300} />
          </>
        )}
      </div> */}

      <div
        id="scrollableDiv"
        className="w-full max-h-[80dvh] overflow-auto flex"
      >
        <InfiniteScroll
          dataLength={FilmData?.films?.length || 0}
          next={fetchMoreData}
          className="flex flex-wrap gap-4 justify-center"
          hasMore={page <= FilmData?.pagination?.pages || false }
          endMessage={
            <p className="w-full text-center mb-10">
              <b>Yay! You have seen it all</b>
            </p>
          }
          loader={
            <div className="w-full flex justify-center overflow-hidden">
              <ClipLoader color="#36d7b7" />
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
          {FilmData?.films &&
            FilmData?.films?.map((item, index) => (
              <FilmCard key={index} data={item} />
            ))}
        </InfiniteScroll>
      </div>
    </div>
    {/* <DeleteModal
    isOpen={isDeleteModalOpen}
    onClose={ () => setIsDeleteModalOpen(false)} 
    onConfirm={handleDelete} 
    itemName={'item'}
    /> */}
    </>
  );
};

export default Films;
