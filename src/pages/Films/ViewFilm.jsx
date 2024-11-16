import React from 'react';

const ViewFilm = () => {


  const data = {
    name: "Sample Item",
    type: "Film",
    date: "2024-11-10",
    description: "This is a captivating film sample. Watch the trailer below to see the magic unfold.",
    thumbnailColor: "#ffcccb",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Random YouTube link
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{data.name}</h2>
        <p className="text-sm text-gray-500 mb-4">Type: {data.type}</p>
        <p className="text-sm text-gray-500 mb-4">Date: {data.date}</p>
        <p className="text-gray-700 mb-4">{data.description}</p>

        {/* Thumbnail */}
        <div
          className="w-full h-48 rounded-lg mb-4"
          style={{ backgroundColor: data.thumbnailColor }}
        ></div>

        {/* Video */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Watch the Trailer:</h3>
          <iframe
            width="100%"
            height="315"
            src={data.videoUrl}
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
