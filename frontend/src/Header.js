import React from "react";
import logo from "./assets/logo.png"; // Update the path to your logo

const Header = () => {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row item-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/">
          <img
            width="160"
            height="160"
            src={logo} // Use the imported image
            className="custom-logo"
            alt="Chest & Kidney Care Centre"
            decoding="async"
          />
          <span className="flex items-center sm:text-4xl text-4xl mb-4 font-bold text-gray-400 bg-white border-0 py-2 px-4 w-auto focus:outline-none rounded">
            CHEST & KIDNEY CARE CENTRE
          </span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900 hover:bg-green-200" href="#2">
            Services
          </a>
          <a className="mr-5 hover:text-gray-900 hover:bg-green-200" href="#3">
            Contact Us
          </a>
          <a className="mr-5 hover:text-gray-900 hover:bg-green-200" href="#4">
            Publications
          </a>
          <a className="mr-5 hover:text-gray-900 hover:bg-green-200" href="#5">
            Achievements
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
