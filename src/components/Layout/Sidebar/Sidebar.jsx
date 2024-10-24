import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../../services/axiosInterceptor";
//icons
import BurstModeIcon from '@mui/icons-material/BurstMode';
import LandscapeIcon from '@mui/icons-material/Landscape';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import GradeIcon from '@mui/icons-material/Grade';
import EmailIcon from '@mui/icons-material/Email';

const Sidebar = () => {
  const navigate = useNavigate()

  const logout = async () => {
    await instance.post(`/auth/logout`);
    navigate("/login");
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0  "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
        <ul className="space-y-2 font-medium">
          {/* <li>
            <Link
              to="/"
              className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer  hover:bg-gray-100  group"
            >
             <SpaceDashboardIcon />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li> */}

          {/* <li>
            <Link
              to="/treks"
              className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer  hover:bg-gray-100  group"
            >
              <LandscapeIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">Treks</span>
            </Link>
          </li> */}

          {/* <li>
            <Link
              to="/tours"
              className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer  hover:bg-gray-100  group"
            >
              <TempleHinduIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">Tours</span>
            </Link>
          </li> */}


          <li>
            <Link
              to="/gallery"
              className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer  hover:bg-gray-100  group"
            >
              <BurstModeIcon />

              <span className="flex-1 ms-3 whitespace-nowrap">Gallery</span>
            </Link>
          </li>
{/* 
          <li>
            <Link
              to="/specialPrograms"
              className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer  hover:bg-gray-100  group"
            >
              <GradeIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">Special Programs</span>
            </Link>
          </li>
          <li>
            <Link
              to="/contacts"
              className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer  hover:bg-gray-100  group"
            >
              <EmailIcon />
              <span className="flex-1 ms-3 whitespace-nowrap">Contacts</span>
            </Link>
          </li> */}
          <li>
            <div
              onClick={() => logout()}
              className="flex items-center p-2 text-gray-900 rounded-lg cursor-pointer  hover:bg-gray-100  group"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
