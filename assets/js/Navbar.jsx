import React, { useState } from "react";

import Login from "./Login";
import Logout from "./Logout";

export default function Navbar({ user, setUser }) {
  const [showMenu, setShowMenu] = useState(false); // Initialize the menu as closed
  const [showLogin, setShowLogin] = useState(false); // Initialize the menu as closed

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Toggle the menu
  };

  const toggleLogin = (event) => {
    setShowLogin(!showLogin); // Toggle the menu
    setShowMenu(false);
    event.preventDefault();
  };

  return (
    <>
      <nav className="bg-blue-500 p-4 fixed top-0 w-full z-10 flex">
        <a href="/">
          <h1
            className={`text-white text-2xl font-semibold ${
              !showMenu ? "self-center" : "self-start"
            }`}
          >
            Criticos
          </h1>
        </a>
        <div className="container mx-auto relative z-10 flex justify-end items-center">
          {/* Show the navigation items in a dropdown menu when the menu is toggled */}
          <div
            className={`md:hidden w-full flex flex-col transition-max-h items-center space-y-4 ${
              showMenu ? "max-h-screen" : "max-h-0 hidden" // Show or hide the dropdown menu based on the toggle state
            }`}
          >
            <NavbarItems
              user={user}
              setUser={setUser}
              toggleLogin={toggleLogin}
            />
          </div>

          {/* Show the navigation items for screens larger than md */}
          <div className="hidden md:flex space-x-4 items-center">
            <NavbarItems
              user={user}
              setUser={setUser}
              toggleLogin={toggleLogin}
            />
          </div>

          {/* Button with animation */}
          <button
            onClick={toggleMenu}
            className="relative group md:hidden self-start"
          >
            <div
              className={`relative flex overflow-hidden items-center cursor justify-center rounded-full w-[50px] h-[50px] transform transition-all  ring-0 ring-gray-300 hover:ring-8 group-hover:ring-4 ring-opacity-30 duration-200  ${
                showMenu
                  ? "group-focus:-translate-y-1.5 group-focus:-rotate-90"
                  : ""
              }`}
            >
              <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                <div
                  className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
                    showMenu
                      ? "group-focus:rotate-[42deg] group-focus:w-2/3 delay-150"
                      : ""
                  }`}
                ></div>
                <div
                  className={`bg-white h-[2px] w-7 rounded transform transition-all duration-300 ${
                    showMenu ? "group-focus:translate-x-10" : ""
                  }`}
                ></div>
                <div
                  className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${
                    showMenu
                      ? "group-focus:-rotate-[42deg] group-focus:w-2/3 delay-150"
                      : ""
                  }`}
                ></div>
              </div>
            </div>
          </button>
        </div>
      </nav>
      {showLogin ? <Login setUser={setUser} toggleLogin={toggleLogin} /> : ""}
    </>
  );
}

function NavbarItems({ user, setUser, toggleLogin }) {
  return (
    <>
      <div className={"text-black"}>
        {!user?.username ? "" : `${user.username}`}
      </div>
      <a href="#" className="text-white">
        Home
      </a>
      {user?.username ? (
        <>
          <a href="/users/settings" className="text-white leading-6 ">
            Settings
          </a>
          <Logout setUser={setUser} />
        </>
      ) : (
        <>
          <a href="/users/register" className="text-white">
            Register
          </a>
          <a
            href="#"
            onClick={toggleLogin}
            className="inline-block text-white border-2 border-white px-9 py-2 rounded-full hover:bg-blue-100 transition"
          >
            Log in
          </a>
        </>
      )}
    </>
  );
}
