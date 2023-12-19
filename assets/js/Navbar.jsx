import React, { useState } from "react";

export default function Navbar({ user }) {
  const [toggleMenu, setToggleMenu] = useState(false); // Initialize the menu as closed

  const toggleButton = () => {
    setToggleMenu(!toggleMenu); // Toggle the menu
  };

  return (
    <nav className="bg-blue-500 p-4 fixed top-0 w-full z-10 flex">
      <h1
        className={`text-white text-2xl font-semibold ${
          !toggleMenu ? "self-center" : "self-start"
        }`}
      >
        Criticos
      </h1>
      <div className="container mx-auto relative z-10 flex justify-end items-center">
        {/* Show the navigation items in a dropdown menu when the menu is toggled */}
        <div
          className={`md:hidden w-full flex flex-col transition-max-h ${
            toggleMenu ? "max-h-screen" : "max-h-0 hidden" // Show or hide the dropdown menu based on the toggle state
          }`}
        >
         <NavbarItems user={user}/>
        </div>

        {/* Show the navigation items for screens larger than md */}
        <div className="hidden md:flex space-x-4">
        <NavbarItems user={user}/>
        </div>

        {/* Button with animation */}
        <button
          onClick={toggleButton}
          className="relative group md:hidden self-start"
        >
          <div
            className={`relative flex overflow-hidden items-center cursor justify-center rounded-full w-[50px] h-[50px] transform transition-all  ring-0 ring-gray-300 hover:ring-8 group-hover:ring-4 ring-opacity-30 duration-200  ${
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
    </nav>
  );
}

function NavbarItems(user){
  return(<>  <a href="#" className="text-white">
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
)}</>)
}