import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDataById } from "../../features/actions/photographyAction";

const ViewPhotography = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { photographyData } = useSelector((state) => state.photography);

  const { mediaFiles = [], photography = {} } = photographyData || {};

  useEffect(() => {
    dispatch(getDataById({ id }));
  }, []);

  function formatDate(date) {
    // Check if date is valid
    if (!date || isNaN(new Date(date))) {
      return "-";
    }

    // Format date to desired format (e.g., "MM/DD/YYYY")
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className=" w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {photography?.name}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Date: {formatDate(photography?.date)}
        </p>
        <p className="text-gray-700 mb-6">{photography?.description}</p>

        {/* Thumbnail */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Thumbnail:</h3>
        <img
          className="w-full h-[90vh]  object-cover rounded-lg mb-6"
          src={photography?.thumbnail}
          alt="thumbnail"
        />

        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Media Files:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mediaFiles.map((imgData, index) => (
            <img
              key={index}
              className="w-full h-48 rounded-lg object-cover"
              src={imgData?.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPhotography;
