import React, { useState, useEffect } from "react";
import Header from "./Header";
import Reviews from "./Reviews";
import Featured from "./Featured";
import Footer from "./Footer";
import Navbar from "./Navbar";


export default function Home() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function loginUser() {
    try {
      const response = await fetch('http://localhost:4000/web_api/users/log_in', {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: "alice@example.com",
            password: "alphaAPPLE11!",
            // Set the remember_me param for the server to remember the user for an
            // extended time (60 days)
            remember_me: "true"
          }
        }),
      }
      );
  
      if (response.status !== 200) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }
  
      const {data: {id, email,  username}} = await response.json();
      console.log(`id:`, id);
      console.log(`email:`, email);
      console.log(`username:`, username);
  
      console.log(`Cookies:`);
      console.dir(response.headers.getSetCookie());
    } catch (error) {
      console.error('Error:', error);
    }
    console.log(response)
  }
  
 


async function logoutUser() {
  try {
    const response = await fetch('http://localhost:4000/web_api/users/log_out', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 204) {
      console.log(`Success: 204 code`);

      console.dir(response.headers.getSetCookie());
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function handleLogin(user){
  if (!isLoggedIn && !user ) {
    setUser(user)
    setIsLoggedIn(true)
  } else {
    setUser(null)
    setIsLoggedIn(false)
  }
}


  return (
    <>
      <Navbar user={user} isLoggedIn={isLoggedIn} login={handleLogin}/>
      <Header />
      <Reviews />
      <Footer />
    </>
  );
}
