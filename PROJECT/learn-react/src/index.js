import { createRoot } from "../packages/react-dom/client";
import * as React from "../packages/react";
import App from "./App";

const appEle = document.getElementById("app");

const root = createRoot(appEle);

root.render(<App />);
