import React, { useState } from "react";
import Header from "./Header";
import Reviews from "./Reviews";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Home() {
  const [user, setUser] = useState({});

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Header />
      <Reviews />
      <Footer />
    </>
  );
}
