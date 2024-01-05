// TODO(BA): This is needed so that logout works
// but we can remove it once everything has moved
// over to React
import "phoenix_html";

import { createRoot } from "react-dom/client";

import Home from "./Home.jsx";

const rootElement = document.getElementById("root");

function App() {
  return (
    < >
      <Home />
    </>
  );
}

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(<App />);
} else {
  console.error('Could not find element with id "root"');
}
