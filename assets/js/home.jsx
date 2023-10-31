import React, { useState, useEffect } from "react";
import Header from "./Header";
import Reviews from "./Reviews";
import Featured from "./Feautured";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Reviews />
      <Footer />
    </>
  );
}
