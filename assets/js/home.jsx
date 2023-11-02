import React, { useState, useEffect } from "react";
import Header from "./Header";
import Reviews from "./Reviews";
import Featured from "./Featured";
import Footer from "./Footer";
import Navbar from "./Nabar";

export default function Home() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar user={user} />
      <Header />
      <Reviews />
      <Footer />
    </>
  );
}
