import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGridItem,
  getGridItems,
  uploadGridImage,
} from "../../features/actions/globalAction";

const ImageGridData = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // Add a ref for the file input
  const { gridImages, isLoading , isDeleting} = useSelector((state) => state.global);

  useEffect(() => {
    dispatch(getGridItems()); // Fetch images when the component mounts
  }, [dispatch]);

  const handleFileChange = (e) => {
    // No need for additional state here; process files directly
  };

  const handleUpload = async () => {
    if (!fileInputRef.current.files.length) {
      alert("Please select images to upload.");
      return;
    }

    const formData = new FormData();
    Array.from(fileInputRef.current.files).forEach((file) => {
      formData.append("images", file);
    });

    const result = await dispatch(uploadGridImage(formData));
    if (result.meta.requestStatus === "fulfilled") {
      fileInputRef.current.value = "";
      dispatch(getGridItems());
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteGridItem(id)).then(() => {
      dispatch(getGridItems());
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Image Grid Data</h1>

      {/* Image Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="file"
            multiple
            ref={fileInputRef} // Attach the ref to the input
            className="border border-gray-300 rounded p-2 w-full sm:w-auto"
          />
          <button
            onClick={handleUpload}
            disabled={isLoading}
            className={`px-4 py-2 rounded text-white ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {/* Uploaded Images Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>
        {gridImages.length === 0 ? (
          <p className="text-gray-500">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gridImages.map((image, index) => (
              <div
                key={index}
                className="relative border rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={image.imageUrl}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-40 object-cover"
                />
                {/* Delete Icon */}
                <button
                  onClick={() => {
                    handleDelete(image?._id);
                  }}
                  disabled={isDeleting}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGridData;
