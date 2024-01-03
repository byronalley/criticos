import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ReviewList from "./ReviewList";
import UserInput from "./UserInput";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        index
        <Route
          index
          element={<UserInput />}
        />
        <Route element={<ReviewList />} />
      </Routes>
    </BrowserRouter>
  );
}
