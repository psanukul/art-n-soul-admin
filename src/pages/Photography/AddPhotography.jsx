import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { CreatePhotography, getDataById, updatePhotography } from "../../features/actions/photographyAction";
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";


const AddPhotography = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [imageName, setImageName] = useState(0);
  const dispatch = useDispatch();
  const [imageUrls, setImageUrls] = useState([]);
const {id}=useParams()
  const[iseditMode,setIsEditMode]=useState(id? true:false)
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

    const photography= useSelector((state) => state.photography);
    Promise.all(previews)
      .then((images) => {
        setImageName(fileArray.length); // Set image count
      })
      .catch((error) => console.error("Error generating previews:", error));
  };

  const onSubmit = (data) => {
    if (data?.thumbnail) {
          data["thumbnail"] = data["thumbnail"][0];}

    setIsLoading(true);
    dispatch(
          iseditMode ? updatePhotography({ formData: data, id }) : CreatePhotography(data)

        ).then((res) => {
          reset();
          if (res?.payload?.success) navigate("/photography");})
       
            
  };
  useEffect(() => {
    if (iseditMode) {
      dispatch(getDataById({ id })).then((res) => {
        if (res?.payload) {
          const photography = res?.payload?.photography;
          console.log("Photography Data:", photography);
  
          reset({
            name: photography.name || "",
            date: photography.date ? photography.date.split("T")[0] : "",
            type: photography.type || "",
            description: photography.description || "",
            images: null|| "", // Adjust based on how you display images
            videoUrl: res.payload.mediaFiles[0]?.url || "",
          });
          setImageUrls(res.payload.mediaFiles.map((file) => file.url) || []);
        }
      });
    }
  }, [id, iseditMode, dispatch, reset]);

  // const onSubmit = (data) => {
  //   if (data?.thumbnail) {
  //     data["thumbnail"] = data["thumbnail"][0];
  //   }
  //   console.log(data);
  //   dispatch(
  //     iseditMode ? updateFilm({ formData: data, id }) : CreateFilm(data)
  //   ).then((res) => {
  //     reset();
  //     if (res?.payload?.success) navigate("/films");
  //   });
  // };
  
  return (
    <div className="p-10">
      <div className="flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Add Photography Item
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6 sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form
          className="space-y-4 mx-8 sm:mx-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Other Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-medium rounded-md">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="border py-2 px-8 rounded-md"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>

            {/* Date */}
            <div className="flex flex-col">
              <label htmlFor="date" className="mb-2 font-medium">
                Date
              </label>
              <input
                type="date"
                className="border py-2 px-8 rounded-md"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <span className="text-red-500">{errors.date.message}</span>
              )}
            </div>

            {/* <div className="flex flex-col">
              <label htmlFor="input" className="mb-2 font-medium">
                Image
              </label>
              <div className="items-center h-full flex justify-center">
                <label
                  className="flex h-full min-h-12 w-full justify-center transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                  id="drop"
                >
                  <span className="flex items-center space-x-2">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="font-medium text-gray-600">
                      {imageName
                        ? `${imageName} file(s) selected`
                        : "Drop files to Attach, or "}
                      <span className="text-blue-600 underline ml-[4px]">
                        browse
                      </span>
                    </span>
                  </span>
                  <input
                    type="file"
                    {...register("images", {
                      required: "Image(s) are required",
                      onChange: (e) => convertToBase64(e.target.files), // Trigger convertToBase64
                    })}
                    className="hidden"
                    accept="image/*"
                    multiple
                    id="input"
                  />
                </label>
              </div>
              {errors.images && (
                <span className="text-red-500">{errors.images.message}</span>
              )}
            </div> */}

            {/* Description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2 font-medium">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Enter description here"
                className="border py-2 px-8 rounded-md"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Type */}
            <div className="flex flex-col px-2">
              <label htmlFor="Type" className="mb-2 font-medium">
                Type
              </label>
              <select
                id="Type"
                className="border py-2 px-8 rounded-md"
                {...register("type", { required: "Please select an option" })}
              >
                <option value="">Select type</option>
                <option value="International">International</option>
                <option value="Indian">Indian</option>
              </select>
              {errors.type && (
                <span className="text-red-500">{errors.type.message}</span>
              )}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
  {imageUrls.length > 0 &&
    imageUrls.map((url, index) => (
      <img
        key={index}
        src={url}
        alt={`Photography Image ${index + 1}`}
        className="w-full h-56 object-cover rounded-md"
      />
    ))}
</div>
   
      </div>
    </div>
  );
};

export default AddPhotography;
