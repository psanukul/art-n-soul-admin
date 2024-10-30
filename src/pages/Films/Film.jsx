import { Pagination, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Toaster } from "sonner";
import { instance } from "../../services/axiosInterceptor";
import { useDispatch, useSelector } from "react-redux";
import { getFilms } from "../../features/actions/FilmAction";

const Films = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openId, setOpenId] = useState(null); // State to track the open dropdown ID
  const navigate = useNavigate();
  const film = useSelector((state) => state.Films);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]);

  const toggleDropdown = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
    navigate(`/films/edit/${id}`);
    setOpenId(null);
  };

  const handleDelete = (id) => {
    console.log("Delete clicked for ID:", id);
    setOpenId(null);
  };

  return (
    <div className="p-10">
      <div className="text-2xl">Film</div>
      <div className="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-8 bg-white">
        <Link
          to="/films/add"
          className="bg-blue-600 rounded-md text-white px-3 py-1 font-semibold"
        >
          Add
        </Link>
      </div>

      <div>
        {isLoading && (
          <>
            <Skeleton animation="wave" height={300} width={300} />
            <Skeleton animation="wave" height={300} width={300} />
            <Skeleton animation="wave" height={300} width={300} />
          </>
        )}
      </div>

      {/* Display your film data here */}
      <div className="grid grid-row-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-4">
        {film?.FilmData?.films &&
          film?.FilmData?.films?.map((item) => (
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

export default Films;
