import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { uploadImg } from "../../features/actions/photographyAction";

const AddGallery = () => {
  const [previewImages, setPreviewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageName, setImageName] = useState([]); // Change to empty array
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onSubmit",
  });

  // Generate preview URLs
  const handleFileChange = (files) => {
    const fileArray = Array.from(files);
    const previews = fileArray.map(file => URL.createObjectURL(file)); // Use createObjectURL

    setPreviewImages(previews); // Set preview images
    setImageName(fileArray.map(file => file.name)); // Set the image names
  };

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    dispatch(uploadImg(data));
    if (isLoading) return;
    setIsLoading(true);
  };

  // Watch for changes to the "images" field
  const temp = watch("images");

  useEffect(() => {
    if (temp?.length > 0) {
      handleFileChange(temp); // Handle file change
    }
  }, [temp]);

  useEffect(() => {
    return () => {
      // Clean up URLs
      previewImages.forEach(image => URL.revokeObjectURL(image));
    };
  }, [previewImages]);

  return (
    <div className="p-10">
      <Toaster />
      <div className="flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Add Gallery Item
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6 sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form className="space-y-4 mx-8 sm:mx-2" onSubmit={handleSubmit(onSubmit)}>
          {/* Image Upload and Preview */}
          <div className="flex gap-10 items-center mx-auto">
            <div className="relative">
              <label htmlFor="input" className="font-medium">Image</label>
              <div className="items-center justify-center">
                <label
                  className="flex justify-center w-[465px] h-[300px] transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                  id="drop"
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="font-medium text-gray-600">
                      {imageName.length > 0
                        ? `${imageName.length} file(s) selected`
                        : "Drop files to Attach, or "}
                      <span className="text-blue-600 underline ml-[4px]">browse</span>
                    </span>
                  </span>
                  <input
                    type="file"
                    {...register("images", { required: "Image is required" })} // Ensure correct name here
                    className="hidden"
                    accept="image/*"
                    multiple // Enable multiple file selection
                    id="input"
                  />
                </label>
              </div>
              {errors.images && <span className="text-red-500">{errors.images.message}</span>}
            </div>

            {/* Image preview */}
            <div>
              <label htmlFor="input" className="font-medium">Preview</label>
              <div className="flex flex-wrap gap-2 border w-[465px] h-[300px] p-2 rounded-md overflow-y-auto">
                {previewImages.length > 0 ? (
                  previewImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      className="max-h-[100px] w-auto object-cover rounded-md"
                      alt={`Preview ${index + 1}`}
                    />
                  ))
                ) : (
                  <span className="text-gray-500">No images selected</span>
                )}
              </div>
            </div>
          </div>

          {/* Other Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-medium rounded-md">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="border py-2 px-8 rounded-md"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            {/* Date */}
            <div className="flex flex-col">
              <label htmlFor="date" className="mb-2 font-medium">Date</label>
              <input
                type="date"
                className="border py-2 px-8 rounded-md"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && <span className="text-red-500">{errors.date.message}</span>}
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2 font-medium">Description</label>
              <textarea
                id="description"
                rows={4}
                placeholder="Enter description here"
                className="border py-2 px-8 rounded-md"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            </div>

            {/* Type */}
            <div className="flex flex-col px-2">
              <label htmlFor="Type" className="mb-2 font-medium">Type</label>
              <select
                id="Type"
                className="border py-2 px-8 rounded-md"
                {...register("type", { required: "Please select an option" })}
              >
                <option value="">Select type</option>
                <option value="International">International</option>
                <option value="Indian">Indian</option>
              </select>
              {errors.type && <span className="text-red-500">{errors.type.message}</span>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="w-48 text-white rounded-md p-2 bg-blue-500 hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#c4c2c2" /> : <>Save</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGallery;
