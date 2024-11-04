import { Pagination, Skeleton, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { instance } from "../../services/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { GetPhotography } from "../../features/actions/photographyAction";

// const StyledPagination = styled(Pagination)(({ theme }) => ({
//   "& .MuiPaginationItem-root": {
//     color: "black",
//   },
// }));

const Photography = () => {
  const [data, setData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const[openId,setOpenId]=useState(null)


  const photographyData = useSelector((state) => state.photography);
  console.log("phoh",photographyData?.photographyData?.Photographies)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetPhotography());
  }, [dispatch]);
  const handlePagination = (e, p) => {
    setPage(p);
    setSearchParams({ page: p });
  };

  const toggleDropdown=(id)=>{
    setOpenId(openId===id? null : id)
  }

  return (
    <div>
      <Toaster />
      <div className="p-10 ">
        <div className="text-2xl">Photography</div>
        <div className="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-8 bg-white ">
          <Link
            to="/photography/add"
            className="bg-blue-600 rounded-md text-white px-3 py-1 font-semibold "
          >
            Add
          </Link>
        </div>
        {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center">
            {isLoading && (
              <>
                <Skeleton animation="wave" height={300} width={300} />
                <Skeleton animation="wave" height={300} width={300} />
                <Skeleton animation="wave" height={300} width={300} />
              </>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center">
            {data &&
              data?.map((item) => (
                <div className="flex flex-col w-[300px]" key={item?._id}>
                  <div className="w-[300px] h-[300px] border rounded-md flex flex-col justify-center items-center">
                    <img
                      src={item?.file[0]?.secure_url}
                      className="object-contain max-w-full max-h-full"
                      alt=""
                    />
                  </div>
                  <div className="flex">
                    <Link
                      to={`/gallery/update/${item?._id}`}
                      className="text-white text-center bg-blue-500 hover:bg-blue-600 w-1/2 p-2 transition duration-300"
                    >
                      View/Edit
                    </Link>
                    <button
                      type="button"
                      className="text-white text-center bg-red-500 hover:bg-red-600 rounded-br-md w-1/2 p-2 transition duration-300"
                      onClick={() => deleteItem(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {!isLoading && data && (
          <div className="flex flex-row justify-center w-full mt-10">
            <StyledPagination
              count={totalPages}
              page={Number(page)}
              color="primary"
              onChange={handlePagination}
            />
          </div>
        )} */}





      </div>
      <div className="grid grid-row-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-4">
        {photographyData?.photographyData?.Photographies &&
         photographyData?.photographyData?.Photographies.map((item) => (
            <div className="flex flex-col w-full gap-20" key={item?._id}>
              <div
                className="border relative rounded-md flex flex-col"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              >
                <img
                  src={item.thumbnail}
                  className="w-full h-[250px] rounded-t-md object-cover border"
                  alt=""
                />
                {/* Dropdown Trigger */}
                <div
                  className="absolute top-2 right-2 px-3 py-1 rounded-md bg-white cursor-pointer text-[#1A1A1A] text-4xl"
                  onClick={() => toggleDropdown(item?._id)}
                >
                  <div className="flex flex-col gap-1 ">
                    <span className="block w-1 h-1 bg-[#1A1A1A] rounded-full"></span>
                    <span className="block w-1 h-1 bg-[#1A1A1A] rounded-full"></span>
                    <span className="block w-1 h-1 bg-[#1A1A1A] rounded-full"></span>
                  </div>
                </div>

                {/* Dropdown Menu */}
                {openId === item?._id && (
                  <div className="absolute top-10 right-0 bg-white border  shadow-lg rounded-md mt-1 z-10">
                    <ul className="py-1">
                      <li
                        onClick={() => handleEdit(item?._id)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Edit
                      </li>
                      <li
                        onClick={() => handleDelete(item?._id)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}

                <div className="flex flex-col justify-start px-4">
                  <div className="text-left text-[#1a1a1a] font-bold">
                    {item?.name}
                  </div>
                  <div className="text-left text-[#374151] pb-10">
                    {new Date(item?.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      
    </div>
  );
};

export default Photography;
