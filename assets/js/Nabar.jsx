import React from "react";

export default function Navbar({ user }) {
  return (
    <nav className="bg-blue-500 p-4 fixed top-0 w-full">
      <div className="container mx-auto relative z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Criticos</h1>
          <div className="space-x-4">
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
                <span className="text-[0.8125rem] leading-6 text-zinc-900 font-semibold"></span>
                <a
                  href={"/users/settings"}
                  className="text-[0.8125rem] leading-6 text-zinc-900 font-semibold hover:text-zinc-700"
                >
                  Settings
                </a>
                <a
                  href={"/users/log_out"}
                  method="delete"
                  className="text-[0.8125rem] leading-6 text-zinc-900 font-semibold hover:text-zinc-700"
                >
                  Log out
                </a>
              </>
            ) : (
              <>
                <a
                  href={"/users/log_in"}
                  className="text-[0.8125rem] leading-6 text-zinc-900 font-semibold hover:text-zinc-700"
                >
                  Log in
                </a>
                <a
                  href={"/users/register"}
                  className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100 transition"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
