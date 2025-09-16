import React, { useState } from "react";
import useIsMobile from "./useIsMobile";
import { Menu } from "lucide-react";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isDropdown, setDropdown] = useState(false);

  return (
    <div className="relative">
      <div className="fixed left-0 top-0 z-50">
        <Menu
          onClick={() => setDropdown(!isDropdown)}
          className="text-white cursor-pointer mt-3 ml-3"
        />
      </div>
      <div
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ${
          isDropdown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDropdown(false)}
      />
      <div
        className={`fixed top-0 left-0 h-screen w-44 md:w-64 bg-white/10 z-40 transform transition-transform duration-300 ${
          isDropdown ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="text-white flex flex-col gap-10 text-center font-bold mt-20">
          <li className="transition-all duration-300 hover:text-gray-400 cursor-pointer">
            Home
          </li>
          <li className="transition-all duration-300 hover:text-gray-400 cursor-pointer">
            About
          </li>
          <li className="transition-all duration-300 hover:text-gray-400 cursor-pointer">
            Education
          </li>
          <li className="transition-all duration-300 hover:text-gray-400 cursor-pointer">
            Experience
          </li>
          <li className="transition-all duration-300 hover:text-gray-400 cursor-pointer">
            Projects
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
