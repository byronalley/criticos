import React, { useState } from "react";

export default function Navbar({ user }) {
  const [toggleMenu, setToggleMenu] = useState(false); // Initialize the menu as closed

  const toggleButton = () => {
    setToggleMenu(!toggleMenu); // Toggle the menu
  };

  return (
    <nav className="bg-blue-500 p-4 fixed top-0 w-full">
      <div className="container mx-auto relative z-10 flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Criticos</h1>

        {/* Show the hamburger menu button only on md screens and lower */}
        {/* <button
          onClick={() => setToggleMenu(!toggleMenu)} // Toggle the menu on button click
          type="button"
          className={`md:hidden text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center ${
            toggleMenu ? "hidden" : "" // Hide or show the hamburger button based on the toggle state
          }`}
          aria-controls="mobile-menu-2"
          aria-expanded={toggleMenu ? "true" : "false"} // Set aria-expanded based on toggle state
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            className={`w-6 h-6 ${toggleMenu ? "" : "hidden"}`} // Show the close icon when the menu is open
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button> */}

        {/* Show the navigation items in a dropdown menu when the menu is toggled */}
        <div
          className={`md:hidden w-full flex flex-col ${
            toggleMenu ? "" : "hidden" // Show or hide the dropdown menu based on the toggle state
          }`}
        >
          <a href="#" className="text-white p-2">
            Home
          </a>
          <a href="#" className="text-white p-2">
            Books
          </a>
          <a href="#" className="text-white p-2">
            Reviews
          </a>
          {!user ? (
            <>
              <a href="/users/settings" className="text-white p-2">
                Settings
              </a>
              <a
                href="/users/log_out"
                method="delete"
                className="text-white p-2"
              >
                Log out
              </a>
            </>
          ) : (
            <>
              <a href="/users/log_in" className="text-white p-2">
                Log in
              </a>
              <a
                href="/users/register"
                className="bg-white text-blue-500 p-2 rounded-full hover:bg-blue-100 transition"
              >
                Sign Up
              </a>
            </>
          )}
        </div>

        {/* Show the navigation items for screens larger than md */}
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#" className="text-white">
            Books
          </a>
          <a href="#" className="text-white">
            Reviews
          </a>
          {!user ? (
            <>
              <a
                href="/users/settings"
                className="text-[0.8125rem] leading-6 text-zinc-900 font-semibold"
              >
                Settings
              </a>
              <a
                href="/users/log_out"
                method="delete"
                className="text-[0.8125rem] leading-6 text-zinc-900 font-semibold"
              >
                Log out
              </a>
            </>
          ) : (
            <>
              <a
                href="/users/log_in"
                className="text-[0.8125rem] leading-6 text-zinc-900 font-semibold"
              >
                Log in
              </a>
              <a
                href="/users/register"
                className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 transition"
              >
                Sign Up
              </a>
            </>
          )}
        </div>
        <div>
          <button onClick={toggleButton} className="relative group">
            <div
              className={`relative flex overflow-hidden items-center cursor justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md ${
                toggleMenu
                  ? "group-focus:-translate-y-1.5 group-focus:-rotate-90"
                  : ""
              }`}
            >
              <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                <div
                  className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
                    toggleMenu
                      ? "group-focus:rotate-[42deg] group-focus:w-2/3 delay-150"
                      : ""
                  }`}
                ></div>
                <div
                  className={`bg-white h-[2px] w-7 rounded transform transition-all duration-300 ${
                    toggleMenu ? "group-focus:translate-x-10" : ""
                  }`}
                ></div>
                <div
                  className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
                    toggleMenu
                      ? "group-focus:-rotate-[42deg] group-focus:w-2/3 delay-150"
                      : ""
                  }`}
                ></div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
