import React, { useState, useEffect } from "react";
import Header from "./Header";
import Reviews from "./Reviews";
import Featured from "./Featured";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Login from "./Login";

export default function Home() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function loginUser() {
    try {
      const response = await fetch(
        "http://localhost:4000/web_api/users/log_in",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              email: user.email,
              password: user.password,
              // Set the remember_me param for the server to remember the user for an
              // extended time (60 days)
              remember_me: "true",
            },
          }),
        }
      );

      if (response.status !== 200) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      const {
        data: { id, email, username },
      } = await response.json();
      setUser({ email, password: user.password });
      console.log(`id:`, id);
      console.log(`email:`, email);
      console.log(`username:`, username);

      console.log(`Cookies:`);
      console.dir(response.headers.getSetCookie());
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(response);
    setUser(response);
  }

  async function logoutUser() {
    try {
      const response = await fetch(
        "http://localhost:4000/web_api/users/log_out",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 204) {
        console.log(`Success: 204 code`);

        console.dir(response.headers.getSetCookie());
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleLogin(user) {
    if (!isLoggedIn && !user) {
      // setUser(user)
      // setIsLoggedIn(true)
      console.log("Logout");
    } else {
      // setUser(null)
      // setIsLoggedIn(false)
      console.log("Login");
    }
  }

  return (
    <>
      <Navbar
        user={user}
        isLoggedIn={isLoggedIn}
      />
      <Header />
      <h1>{user.username}</h1>
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className="bg-blue-500"
        onClick={loginUser}
      >
        Login
      </button>{" "}
      <Reviews />
      <Footer />
    </>
  );
}
