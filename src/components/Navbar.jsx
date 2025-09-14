import React, { useState } from 'react'
import useIsMobile from './useIsMobile';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isDropdown, setDropdown] = useState(false);

  return (
    <div className="pt-5 mb-10">
      {!isMobile ? (
        <div className="w-fit mx-auto text-shadow-lg text-shadow-black/10">
          <ul className="text-white flex gap-25 font-bold">
            <li className="transition-all duration-300 hover:text-pink-100 cursor-pointer">Home</li>
            <li className="transition-all duration-300 hover:text-pink-100 cursor-pointer">About</li>
            <li className="transition-all duration-300 hover:text-pink-100 cursor-pointer">Education</li>
            <li className="transition-all duration-300 hover:text-pink-100 cursor-pointer">Experience</li>
            <li className="transition-all duration-300 hover:text-pink-100 cursor-pointer">Projects</li>
          </ul>
        </div>
      ) : (
        <div className="fixed right-0 top-0 z-50">
          <Menu onClick={() => setDropdown(!isDropdown)} className="text-white relative z-50 cursor-pointer mt-3 mr-3"/>
          {isDropdown && (
            <div className="bg-pink-300/70 w-40 absolute right-0 top-0 z-40 h-screen flex flex-col">
              <ul className="text-white flex flex-col gap-10 text-center font-bold mt-15">
                <li className="transition-all duration-300 hover:text-pink-200 cursor-pointer">Home</li>
                <li className="transition-all duration-300 hover:text-pink-200 cursor-pointer">About</li>
                <li className="transition-all duration-300 hover:text-pink-200 cursor-pointer">Education</li>
                <li className="transition-all duration-300 hover:text-pink-200 cursor-pointer">Experience</li>
                <li className="transition-all duration-300 hover:text-pink-200 cursor-pointer">Projects</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
