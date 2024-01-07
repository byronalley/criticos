import React, { useState, useEffect } from "react";
import Header from "./Header";
import Reviews from "./Reviews";
import Featured from "./Featured";
import Footer from "./Footer";
import BookSearch from "./components/BookSearch";

export default function Home() {
  return (
    <>
      <Header />
      {/* <BookSearch /> */}
      {/* <Reviews /> */}
      <Footer />
    </>
  );
}
