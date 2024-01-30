import React from "react";
import { loginUser } from "./lib/Session";

export default function Login({ setUser, toggleLogin }) {
  async function handleLogin(event) {
    const email = event.target.email.value;
    const password = event.target.password.value;

    event.preventDefault();

    try {
      const user = await loginUser(email, password);
      alert("Logged in!");

      setUser(user);
      toggleLogin(event);
    } catch (e) {
      if (e.message == "AuthenticationError") {
        alert("Invalid login or password");
      } else {
        console.log(`Unexpected error: name=${e.name} message=${e.message}`);
        console.dir(e);
        //Probably a network error
        alert("Network error!");
      }
    }
  }

  return (
    <>
      <form
        className="bg-blue-500 p-10 w-full z-20 flex flex-col md:flex-row items-center justify-center"
        onSubmit={handleLogin}
      >
        <a
          onClick={toggleLogin}
          className="h-10 px-4 py-2 mb-4 md:mb-0 md:mr-4 justify-center"
        >
          {" "}
          X{" "}
        </a>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="h-10 px-4 border rounded-md mb-4 md:mb-0 md:mr-4"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="h-10 px-4 border rounded-md mb-4 md:mb-0 md:mr-4"
        />
        <button
          type="submit"
          className="inline-block bg-white text-blue-500 p-5 px-9 py-3 rounded-full hover:bg-blue-100 transition"
        >
          Login
        </button>
      </form>
      <div className="bg-blue-500 p-10 w-full z-20 flex flex-col md:flex-row items-center justify-center">
        <span className="inline-block p-5">{"Don't have an account yet?"}</span>
        <a
          className="inline-block underline p-5 text-white bg-white-400 hover:bg-white-100 transition"
          href="/users/register"
        >
          Sign up!
        </a>
      </div>
    </>
  );
}
