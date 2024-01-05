import React, { useState, useEffect } from "react";
import Header from "./Header";
import Reviews from "./Reviews";
import Featured from "./Featured";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Login from "./Login";

export default function Home() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function loginUser({ email, password }) {
    try {
      const response = await fetch(
        "http://localhost:4000/web_api/users/log_in",
        {
          method: "POST",
          mode: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              email,
              password,
              // Set the remember_me param for the server to remember the user for an
              // extended time (60 days)
              remember_me: "true",
            },
          }),
        }
      );
      console.log("response ", response);

      if (response.status !== 200) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      const { data } = await response.json();
      setUser(data);
      setIsLoggedIn(true);
      console.dir(data);
      console.dir(user);

      console.dir(response.headers.getSetCookie());
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(user);
  }

  async function logoutUser(event) {
    try {
      const response = await fetch(
        "http://localhost:4000/web_api/users/log_out",
        {
          mode: "same-origin",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 204) {
        console.log(`Success: 204 code`);

        console.dir(response.headers.getSetCookie());
        alert("Logged out successfully");

        return false;
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        alert("Error logging out");
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <Navbar
        user={user}
        isLoggedIn={isLoggedIn}
        logoutUser={logoutUser}
      />
      <Header />
      {!user ? <h1>Login</h1> : <h1>{user.username}</h1>}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log(event.target.email.value);
          console.log(event.target.password.value);
          loginUser({
            email: event.target.email.value,
            password: event.target.password.value,
          });
        }}
      >
        <input
          type="email"
          placeholder="Email"
          name="email"

          // value={user.email}
          // onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          // value={user.password}
          // onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-500"
        >
          Login
        </button>
      </form>
      <Reviews />
      <Footer />
    </>
  );
}
