import React from "react";
import { createRoot } from "react-dom/client";
import DynamicApp from "./dynamic";

function App() {
  return (
    <div>
      这是App
      <DynamicApp />
    </div>
  );
}

const root = createRoot(document.getElementById("app"));

root.render(<App />);
