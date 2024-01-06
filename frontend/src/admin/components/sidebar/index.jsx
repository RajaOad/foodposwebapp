/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import routes from "../../routes.js";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Brand <span className="font-medium">NAME</span>
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
        <Link to="/">
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className="my-[3px] flex cursor-pointer items-center px-8"
              >
                <span
                  className={`font-medium text-gray-600`}
                >
                  < MdHome />
                </span>
                <p
                  className={`leading-1 ml-4 flex font-medium text-gray-600`}
                >
                 Home
                </p>
              </li>
            </div>
          </Link>
      </ul>

      {/* Free Horizon Card */}
      {/* <div className="flex justify-center">
        <SidebarCard />
      </div> */}

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
