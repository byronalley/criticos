import React, { useState, useEffect } from "react";

import Footer from "./Footer";
import BookReview from "./Header";

export default function Home() {
  return (
    <>
      <BookReview />
      {/* <Reviews /> */}
      <Footer />
    </>
  );
}
