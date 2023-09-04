import { createRoot } from "react-dom/client";
import App from "./App";

const appEle = document.getElementById("app");

const root = createRoot(appEle);

root.render(<App />);
