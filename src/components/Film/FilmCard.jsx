import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FilmCard = (props) => {
  const { data, handleDelete, openId, setOpenId, route = "films" } = props;

  const navigate = useNavigate();

  const toggleDropdown = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
    navigate(`/${route}/edit/${id}`);
    setOpenId(null);
  };

  return (
    <div
      onClick={() => navigate(`/${route}/view/${data?._id}`)}
      className="flex cursor-pointer flex-col w-64 gap-20"
    >
      <div
        className="border relative rounded-md flex flex-col"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <img
          src={data.thumbnail}
          className="w-full h-[250px] rounded-md object-cover border"
          alt=""
        />
        {/* Dropdown Trigger */}
        <div
          className="absolute top-2 right-2 px-2 py-3 rounded-md  cursor-pointer text-[#1A1A1A] text-4xl"
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown(data?._id)
          }}
        >
          <div className="flex gap-1 ">
            <span className="block w-1 h-1 bg-[#ccc6c6] rounded-full"></span>
            <span className="block w-1 h-1 bg-[#ccc6c6] rounded-full"></span>
            <span className="block w-1 h-1 bg-[#ccc6c6] rounded-full"></span>
          </div>
        </div>

        {/* Dropdown Menu */}
        {openId === data?._id && (
          <div className="absolute top-10 right-0 bg-white border  shadow-lg rounded-md mt-1 z-10">
            <ul className="py-1">
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(data?._id)
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Edit
              </li>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(data?._id)
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Delete
              </li>
            </ul>
          </div>
        )}

        <div className="flex flex-col justify-start px-4">
          <div className="text-left text-[#1a1a1a] font-bold">{data?.name}</div>
          <div className="text-left text-[#374151] pb-10">
            {new Date(data?.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
