import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReviewList from "./ReviewList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<ReviewList />}
        />
      </Routes>
    </BrowserRouter>
  );
}
