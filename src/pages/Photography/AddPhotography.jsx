import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  CreatePhotography,
  getDataById,
  updatePhotography,
  uploadPhotographyImages,
  deleteMediaById,
} from "../../features/actions/photographyAction";
import { useNavigate, useParams } from "react-router-dom";

const AddPhotography = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageName, setImageName] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  const convertToBase64 = (files) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const previews = fileArray.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    });

    Promise.all(previews)
      .then((images) => {
        setImageName(fileArray.length);
      })
      .catch((error) => console.error("Error generating previews:", error));
  };

  const onSubmit = (data) => {
    if (data?.thumbnail) {
      data["thumbnail"] = data["thumbnail"][0];
    }

    setIsLoading(true);
    dispatch(
      isEditMode
        ? updatePhotography({ formData: data, id })
        : CreatePhotography(data)
    ).then((res) => {
      reset();
      if (res?.payload?.success) navigate("/photography");
    });
  };

  const handleDelete = (imageId) => {
    dispatch(deleteMediaById(imageId)).then(() => getDataForEdit());
  };

  const getDataForEdit = () => {
    dispatch(getDataById({ id })).then((res) => {
      if (res?.payload) {
        const photography = res.payload.photography;
        reset({
          name: photography.name || "",
          date: photography.date ? photography.date.split("T")[0] : "",
          type: photography.type || "",
          description: photography.description || "",
          images: null,
        });
        setImageUrls(res.payload.mediaFiles || []);
      }
    });
  };

  useEffect(() => {
    if (isEditMode) {
      getDataForEdit();
    }
  }, [id, isEditMode]);

  return (
    <div className="p-10">
      <div className="flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          {isEditMode ? "Update" : "Add"} Photography Item
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6 sm:max-w-5xl mt-8 mx-auto">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="border py-2 px-8 rounded-md"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="date" className="mb-2 font-medium">Date</label>
              <input
                type="date"
                className="border py-2 px-8 rounded-md"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && <span className="text-red-500">{errors.date.message}</span>}
            </div>

            {!isEditMode && (
              <div className="flex flex-col">
                <label htmlFor="input" className="mb-2 font-medium">Image</label>
                <div className="items-center flex justify-center">
                  <label
                    className="flex w-full justify-center transition bg-white border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 focus:outline-none"
                    htmlFor="input"
                  >
                    <span className="flex items-center space-x-2">
                      <span className="font-medium text-gray-600">
                        {imageName ? `${imageName} file(s) selected` : "Drop files to Attach, or "}
                        <span className="text-blue-600 underline ml-[4px]">browse</span>
                      </span>
                    </span>
                    <input
                      type="file"
                      {...register("images", {
                        required: "Image(s) are required",
                        onChange: (e) => convertToBase64(e.target.files),
                      })}
                      className="hidden"
                      accept="image/*"
                      multiple
                      id="input"
                    />
                  </label>
                </div>
                {errors.images && <span className="text-red-500">{errors.images.message}</span>}
              </div>
            )}

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

            <div className="flex flex-col">
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

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="w-48 text-white rounded-md p-2 bg-blue-500 hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#c4c2c2" /> : <>{isEditMode ? "Update" : "Save"}</>}
            </button>
          </div>
        </form>
      </div>

      {isEditMode && (
        <UpdateImagesSection
          getDataForEdit={getDataForEdit}
          id={id}
          imageUrls={imageUrls}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

const UpdateImagesSection = ({ imageUrls, handleDelete, id, getDataForEdit }) => {
  const dispatch = useDispatch();
  const { handleSubmit, register, formState: { errors }, reset } = useForm();
  const [imageCount, setImageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    dispatch(uploadPhotographyImages({ formData: data, id })).then(() => {
      getDataForEdit();
      setImageCount(0);
      reset({ images: null });
    }).finally(() => setIsLoading(false));
  };

  const convertToBase64 = (files) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    Promise.all(fileArray.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    })).then(() => setImageCount(fileArray.length));
  };

  return (
    <div className="w-full mt-10">
      <h3 className="text-gray-600 text-center text-2xl font-semibold sm:text-3xl">
        Update Photography Images
      </h3>
      <form className="space-y-4 mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center">
          <label htmlFor="images" className="mb-2 font-medium">Images</label>
          <label
            htmlFor="images"
            className="flex w-full max-w-lg justify-center py-8 bg-white border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400"
          >
            <span className="text-gray-600 font-medium">
              {imageCount ? `${imageCount} file(s) selected` : "Drop files to attach, or click to browse"}
            </span>
            <input
              type="file"
              id="images"
              {...register("images", {
                onChange: (e) => convertToBase64(e.target.files),
              })}
              className="hidden"
              accept="image/*"
              multiple
            />
          </label>
          {errors.images && <span className="text-red-500">{errors.images.message}</span>}
        </div>

        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="w-48 text-white rounded-md p-2 bg-blue-500 hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color="#c4c2c2" /> : "Upload"}
          </button>
        </div>
      </form>

      <div className="w-full mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
  {imageUrls.map((image, index) => (
    <div key={index} className="relative group">
      <img 
        src={image?.url} 
        alt={`img-${index}`} 
        className="rounded-md object-cover w-full h-full" 
      />
      <button
        onClick={() => handleDelete(image?._id)}
        
        className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full shadow-lg text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        X
      </button>
     
    
    </div>
  ))}
</div>

    </div>
  );
};

export default AddPhotography;
