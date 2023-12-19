// TODO(BA): This is needed so that logout works
// but we can remove it once everything has moved
// over to React
import "phoenix_html"

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import { AuthorsList } from "./authors.jsx";
import Home from "./Home.jsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  //root.render(<App />);
  root.render(
    <>
      <Home />
    </>
  );
} else {
  console.error('Could not find element with id "root"');
}
