import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletephotographyById,
  GetPhotography,
  nextPagePhotography,
} from "../../features/actions/photographyAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import DeleteModal from "../../components/DeleteModal";
import FilmCard from "../../components/Film/FilmCard";

const Photography = () => {
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { photographyData } = useSelector((state) => state.photography);
  console.log("phoh", photographyData?.pagination?.pages);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getphotographyData();
    setPage(2);
  }, [dispatch]);

  const toggleDropdown = (id) => {
    setOpenId(openId === id ? null : id);
  };
  const handleEdit = (id) => {
    navigate(`/photography/edit/${id}`);
    setOpenId(null);
  };
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };
  const getphotographyData = () => {
    dispatch(GetPhotography());
    setPage(2);
  };

  const onConfirmDelete = () => {
    dispatch(deletephotographyById(openId)).then(() => {
      setIsDeleteModalOpen(false);
      setOpenId(null);
      getphotographyData();
    });
  };

  const fetchMoreData = () => {
    dispatch(nextPagePhotography({ page }));

    setPage((prev) => prev + 1);
  };

  return (
    <>
      <div>
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
        </div>

        <div
          id="scrollableDiv"
          className="w-full max-h-[80dvh] overflow-auto flex"
        >
          <InfiniteScroll
            dataLength={photographyData?.Photographies?.length || 0}
            next={fetchMoreData}
            className="flex flex-wrap gap-4 justify-center"
            hasMore={page <= photographyData?.pagination?.pages || false}
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
            <div className="grid grid-row-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-4">
              {photographyData?.Photographies &&
                photographyData?.Photographies.map((item, index) => (
                  <FilmCard
                    key={index}
                    data={item}
                    handleDelete={handleDelete}
                    openId={openId}
                    setOpenId={setOpenId}
                    route="photography"
                  />
                ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onConfirmDelete}
      />
    </>
  );
};

export default Photography;

{
  /* <div
                    className="flex flex-col w-full gap-20"
                    onClick={() => navigate(`/photography/view/${item?._id}`)}
                    key={item?._id}
                  >
                    <div
                      className="border relative rounded-md flex flex-col"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    >
                      <img
                        src={item.thumbnail}
                        className="w-full h-[250px] rounded-t-md object-cover border"
                        alt=""
                      />
                      {/* Dropdown Trigger */
}
//     <div
//       className="absolute top-2 right-2 px-3 py-1 rounded-md bg-white cursor-pointer text-[#1A1A1A] text-4xl"
//       onClick={(e) => {
//         e.stopPropagation();
//         toggleDropdown(item?._id);
//       }}
//     >
//       <div className="flex flex-col gap-1 ">
//         <span className="block w-1 h-1 bg-[#1A1A1A] rounded-full"></span>
//         <span className="block w-1 h-1 bg-[#1A1A1A] rounded-full"></span>
//         <span className="block w-1 h-1 bg-[#1A1A1A] rounded-full"></span>
//       </div>
//     </div>

//     {/* Dropdown Menu */}
//     {openId === item?._id && (
//       <div className="absolute top-10 right-0 bg-white border  shadow-lg rounded-md mt-1 z-10">
//         <ul className="py-1">
//           <li
//             onClick={(e) => {
//               e.stopPropagation();
//               handleEdit(item?._id);
//             }}
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//           >
//             Edit
//           </li>
//           <li
//             onClick={(e) => {
//               e.stopPropagation();
//               handleDelete(item?._id);
//             }}
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//           >
//             Delete
//           </li>
//         </ul>
//       </div>
//     )}

//     <div className="flex flex-col justify-start px-4">
//       <div className="text-left text-[#1a1a1a] font-bold">
//         {item?.name}
//       </div>
//       <div className="text-left text-[#374151] pb-10">
//         {new Date(item?.date).toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "numeric",
//           day: "numeric",
//         })}
//       </div>
//     </div>
//   </div>
// </div> */}
