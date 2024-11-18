import React, { useEffect } from "react";
import { getDataById } from "../../features/actions/FilmAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewFilm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleFilmData } = useSelector((state) => state.Films);
  const { film = {} } = singleFilmData || {};

  const data = {
    name: "Sample Item",
    type: "Film",
    date: "2024-11-10",
    description:
      "This is a captivating film sample. Watch the trailer below to see the magic unfold.",
    thumbnailColor: "#ffcccb",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Random YouTube link
  };

  useEffect(() => {
    dispatch(getDataById({ id }));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className=" w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{film?.name}</h2>
        <p className="text-sm text-gray-500 mb-4">Type: {film?.type}</p>
        <p className="text-sm text-gray-500 mb-4">Date: {film?.date}</p>
        <p className="text-gray-700 mb-4">{film?.description}</p>

        {/* Thumbnail */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Thumbnail:</h3>
        <img
          className="w-full h-[72vh]  object-cover rounded-lg mb-6"
          src={film?.thumbnail}
          alt="thumbnail"
        />

        {/* Video */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Watch the Trailer:</h3>
          <iframe
            width="100%"
            height="500"
            src={film?.videoUrl}
            title="Video Preview"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ViewFilm;
