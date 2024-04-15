import React from "react";
import { AiOutlineHome} from "react-icons/ai";
import { TbToolsKitchen, TbWashMachine } from "react-icons/tb";
import { FaBox } from "react-icons/fa";
import { MdFormatColorFill } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {

  return (
    <div
      style={{ zIndex: 20 }}
      className=" flex-col justify-between p-4 font-semibold text-xl sm:max-lg:text-sm bg-black text-[#f59e0b] w-14 hover:w-[15%] h-[100vh] top-0 fixed"
      id="navigation-container"
    >

      <div className="flex flex-col justify-center space-y-8 sm:max-lg:space-y-1 sm:max-lg:-my-16">
       <Link
          to="/"
          className="flex mt-12 items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Home</span>{" "}
        </Link>

        <Link
          to="/user/Create-Data-Retort"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <TbWashMachine className="mr-2 mt-[3rem]" size={28} />
          <span className="hidden nav-item-name mt-[3rem]"> Retort</span>{" "}
        </Link>

        <Link
          to="/user/Create-Data-Filling"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <MdFormatColorFill className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Filling/Sealing</span>{" "}
        </Link>

        <Link to="/user/Create-Data-Kitchen" className="flex relative">
          <div className="flex items-center transition-transform transform hover:translate-x-2">
            <TbToolsKitchen className="mt-[3rem] mr-2" size={18} />
            <span className="hidden nav-item-name mt-[3rem]">Kitchen</span>{" "}
          </div>
        </Link>

        <Link to="/user/Create-Data-Dispatch" className="flex relative">
          <div className="flex justify-center items-center transition-transform transform hover:translate-x-2">
          <FaBox className="mt-[3rem] mr-2" size={16} />
            <span className="hidden nav-item-name mt-[3rem]">
              Dispatch
            </span>{" "}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;