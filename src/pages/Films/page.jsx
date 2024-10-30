"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { CreateFilm, getDataById } from "../../features/actions/FilmAction";
import { useNavigate, useParams } from "react-router-dom";
function AddFilms() {
  const{ id}= useParams()
  console.log("i f",id)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate()
const film=useSelector(state=>state.Films)
console.log("gkgds",film)
const dispatch=useDispatch();

useEffect(() => {
  if (id) {
    dispatch(getDataById({ id })).then((res) => {
      if (res?.payload) {
        const filmData = res.payload.film;
        reset({
          name: filmData.name || '',
          date: filmData.date ? filmData.date.split('T')[0] : '', // Format date if needed
          type: filmData.type || '',
          description: filmData.description || '',
          videoUrl: res.payload.mediaFiles[0]?.url || '', // Assuming the URL is in mediaFiles
        });
      }
    });
  }
}, [id, dispatch, reset]);

  const onSubmit = (data) => {
    data['thumbnail'] = data['thumbnail'][0];
    console.log(data);
    dispatch(CreateFilm(data))
    .then((res) => {
        setIsLoading(false);
        reset();
        if(res?.payload?.success)
        navigate('/films')
      })

  };

  return (
    <div className="p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Name */}
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

          {/* Type */}
          <div className="flex flex-col">
            <label htmlFor="type" className="mb-2 font-medium">Type</label>
            <select
              id="type"
              className="border py-2 px-8 rounded-md"
              {...register("type", { required: "Please select an option" })}
            >
              <option value="">Select type</option>
              <option value="International">International</option>
              <option value="Indian">Indian</option>
            </select>
            {errors.type && <span className="text-red-500">{errors.type.message}</span>}
          </div>

          {/* Video Link */}
          <div className="flex flex-col">
            <label htmlFor="videoUrl" className="mb-2 font-medium">Video Link</label>
            <input
              type="url"
              placeholder="Enter video link"
              className="border py-2 px-8 rounded-md"
              {...register("videoUrl", { 
                required: "Video link is required",
                pattern: {
                
                  message: "Please enter a valid YouTube link"
                }
              })}
            />
            {errors.videoUrl && <span className="text-red-500">{errors.videoUrl.message}</span>}
          </div>
  {/* Description */}
  <div className="flex flex-col">
            <label htmlFor="description" className="mb-2 font-medium">Description</label>
            <textarea
              id="description"
              rows={1}
              placeholder="Enter description here"
              className="border py-6 px-8 rounded-md"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
          </div>
          {/* Thumbnail Image */}
          <div className="flex flex-col">
            <label htmlFor="thumbnail" className="mb-2 font-medium">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              className="border py-6 px-8 rounded-md"
              {...register("thumbnail", { required: "Thumbnail image is required" })}
            />
            {errors.thumbnail && <span className="text-red-500">{errors.thumbnail.message}</span>}
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
  );
}

export default AddFilms;
