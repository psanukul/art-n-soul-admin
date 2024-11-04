import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const FilmCard = ({data}) => {
    const [openId, setOpenId] = useState(null); // State to track the open dropdown ID
    const navigate = useNavigate();

    const toggleDropdown = (id) => {
        setOpenId(openId === id ? null : id);
      };
    
      const handleEdit = (id) => {
        console.log("Edit clicked for ID:", id);
        navigate(`/films/edit/${id}`);
        setOpenId(null);
      };
    
      const handleDelete = (id) => {
        console.log("Delete clicked for ID:", id);
        setOpenId(null);
      };

  return (
    <div className="flex flex-col w-64 gap-20" key={data?._id}>
              <div
                className="border relative rounded-md flex flex-col"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              >
                <img
                  src={data.thumbnail}
                  className="w-full h-[250px] rounded-t-md object-cover border"
                  alt=""
                />
                {/* Dropdown Trigger */}
                <div
                  className="absolute top-2 right-2 px-3 py-1 rounded-md bg-white cursor-pointer text-[#1A1A1A] text-4xl"
                  onClick={() => toggleDropdown(data?._id)}
                >
                  <div className="flex flex-col gap-1 ">
                    <span className="block w-1 h-1 bg-[#1A1A1A] rounded-full"></span>
                    <span className="block w-1 h-1 bg-[#1A1A1A] rounded-full"></span>
                    <span className="block w-1 h-1 bg-[#1A1A1A] rounded-full"></span>
                  </div>
                </div>

                {/* Dropdown Menu */}
                {openId === data?._id && (
                  <div className="absolute top-10 right-0 bg-white border  shadow-lg rounded-md mt-1 z-10">
                    <ul className="py-1">
                      <li
                        onClick={() => handleEdit(data?._id)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Edit
                      </li>
                      <li
                        onClick={() => handleDelete(data?._id)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}

                <div className="flex flex-col justify-start px-4">
                  <div className="text-left text-[#1a1a1a] font-bold">
                    {data?.name}
                  </div>
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
  )
}

export default FilmCard